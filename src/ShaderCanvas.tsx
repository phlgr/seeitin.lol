import { useEffect, useRef } from "react";
import type { ShaderKind } from "./formats.ts";

interface Props {
  video: HTMLVideoElement | null;
  shader: ShaderKind;
  width: number;
  height: number;
}

/** Low-res processing buffer dimensions per shader (the authentic resolution). */
const BUFFER: Record<ShaderKind, { w: number; h: number; fps: number }> = {
  gameboy: { w: 160, h: 144, fps: 30 },
  nokia: { w: 84, h: 48, fps: 15 },
  eink: { w: 180, h: 135, fps: 1 },
  dotmatrix: { w: 168, h: 21, fps: 20 },
};

// Classic DMG Game Boy 4-tone palette (dark → light green).
const GAMEBOY_PALETTE: [number, number, number][] = [
  [15, 56, 15],
  [48, 98, 48],
  [139, 172, 15],
  [155, 188, 15],
];

// Nokia 3310: dark pixels on a pea-green LCD.
const NOKIA_ON: [number, number, number] = [43, 58, 20];
const NOKIA_OFF: [number, number, number] = [154, 175, 108];

// 4×4 Bayer matrix (normalized 0..1) for ordered dithering.
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => (v + 0.5) / 16));

function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

/**
 * Renders a video (or a procedural fallback pattern) through a retro
 * rendering pass: downscale → palette/dither → nearest-neighbor upscale.
 */
export function ShaderCanvas({ video, shader, width, height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h, fps } = BUFFER[shader];
    const buf = document.createElement("canvas");
    buf.width = w;
    buf.height = h;
    const bctx = buf.getContext("2d", { willReadFrequently: true });
    if (!bctx) return;

    let raf = 0;
    let last = -Infinity;
    const interval = 1000 / fps;
    // Deterministic clock so we don't depend on Date.now / performance jitter.
    let clock = 0;

    const drawFallback = (t: number) => {
      // Moving diagonal gradient bars — a stand-in until a real trailer is set.
      const img = bctx.createImageData(w, h);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const v = (Math.sin((x + y + t * 0.06) * 0.12) * 0.5 + 0.5) * 255;
          const i = (y * w + x) * 4;
          img.data[i] = v * 0.6;
          img.data[i + 1] = v;
          img.data[i + 2] = 255 - v * 0.7;
          img.data[i + 3] = 255;
        }
      }
      bctx.putImageData(img, 0, 0);
    };

    const process = () => {
      const img = bctx.getImageData(0, 0, w, h);
      const d = img.data;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const lum = luminance(d[i], d[i + 1], d[i + 2]); // 0..255
          if (shader === "gameboy") {
            const dither = (BAYER[y & 3][x & 3] - 0.5) * 64;
            const level = Math.min(
              3,
              Math.max(0, Math.floor(((lum + dither) / 256) * 4)),
            );
            const [r, g, b] = GAMEBOY_PALETTE[level];
            d[i] = r;
            d[i + 1] = g;
            d[i + 2] = b;
          } else if (shader === "nokia") {
            const on = lum / 255 < BAYER[y & 3][x & 3];
            const [r, g, b] = on ? NOKIA_ON : NOKIA_OFF;
            d[i] = r;
            d[i + 1] = g;
            d[i + 2] = b;
          } else {
            // e-ink: grayscale with light ordered dithering, 16 levels.
            const dither = (BAYER[y & 3][x & 3] - 0.5) * 24;
            const g = Math.round((lum + dither) / 17) * 17;
            const c = Math.min(255, Math.max(0, g));
            d[i] = c;
            d[i + 1] = c;
            d[i + 2] = c;
          }
        }
      }
      bctx.putImageData(img, 0, 0);
    };

    // Amber LED dot-matrix board (transit/airport strip signage).
    const renderDotMatrix = () => {
      const img = bctx.getImageData(0, 0, w, h);
      const d = img.data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#080604";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cw = canvas.width / w;
      const ch = canvas.height / h;
      const r = Math.min(cw, ch) * 0.42;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const lum = luminance(d[i], d[i + 1], d[i + 2]) / 255;
          const cx = x * cw + cw / 2;
          const cy = y * ch + ch / 2;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          if (lum > 0.1) {
            ctx.fillStyle = `rgba(255,176,0,${Math.min(1, 0.15 + lum)})`;
          } else {
            ctx.fillStyle = "rgba(70,40,0,0.5)";
          }
          ctx.fill();
        }
      }
    };

    const frame = () => {
      clock += 16.7;
      raf = requestAnimationFrame(frame);
      if (clock - last < interval) return;
      last = clock;

      const ready = video && video.readyState >= 2 && video.videoWidth > 0;
      if (ready) {
        // Cover-fit the video into the low-res buffer.
        const vr = video.videoWidth / video.videoHeight;
        const br = w / h;
        let sx = 0;
        let sy = 0;
        let sw = video.videoWidth;
        let sh = video.videoHeight;
        if (vr > br) {
          sw = video.videoHeight * br;
          sx = (video.videoWidth - sw) / 2;
        } else {
          sh = video.videoWidth / br;
          sy = (video.videoHeight - sh) / 2;
        }
        bctx.drawImage(video, sx, sy, sw, sh, 0, 0, w, h);
      } else {
        drawFallback(clock);
      }
      if (shader === "dotmatrix") {
        renderDotMatrix();
      } else {
        process();
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(buf, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [video, shader]);

  // Backing store at device pixels of the frame; CSS scales to the box.
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  return (
    <canvas
      ref={canvasRef}
      width={Math.max(1, Math.round(width * dpr))}
      height={Math.max(1, Math.round(height * dpr))}
      style={{ width, height, display: "block", imageRendering: "pixelated" }}
    />
  );
}
