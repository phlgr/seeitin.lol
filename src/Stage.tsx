import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { FormatDescriptor } from "./formats.ts";
import { ShaderCanvas } from "./ShaderCanvas.tsx";
import { TRAILER_POSTER, TRAILER_SRC } from "./config.ts";

interface Props {
  format: FormatDescriptor;
  video: HTMLVideoElement | null;
  onVideo: (el: HTMLVideoElement | null) => void;
}

/** Fit a box of the given aspect ratio inside the container (letter/pillarbox). */
function fitBox(cw: number, ch: number, aspect: number) {
  let w = cw;
  let h = w / aspect;
  if (h > ch) {
    h = ch;
    w = h * aspect;
  }
  return { w: Math.round(w), h: Math.round(h) };
}

export function Stage({ format, video, onVideo }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [hasVideo, setHasVideo] = useState(true);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setBox(fitBox(r.width, r.height, format.aspect));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [format.aspect]);

  // Keep the shared <video> playing even while hidden behind a shader canvas.
  useEffect(() => {
    video?.play().catch(() => {});
  }, [video]);

  const isShader = format.renderer === "shader";
  const maskStyle: React.CSSProperties =
    format.mask === "circle"
      ? { clipPath: "circle(50% at 50% 50%)" }
      : format.mask === "porthole"
        ? {
            clipPath: "circle(50% at 50% 50%)",
            transform: "scale(1.12)",
            transformOrigin: "center",
          }
        : {};

  return (
    <div className="stage" ref={stageRef}>
      <div
        className={`frame frame--${format.category}`}
        style={{ width: box.w, height: box.h }}
        data-format={format.id}
      >
        {isShader ? (
          <ShaderCanvas
            video={video}
            shader={format.shader!}
            width={box.w}
            height={box.h}
          />
        ) : null}

        <video
          ref={onVideo}
          className={`media ${isShader ? "media--offscreen" : ""}`}
          style={maskStyle}
          src={TRAILER_SRC}
          poster={TRAILER_POSTER}
          crossOrigin="anonymous"
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setHasVideo(true)}
          onError={() => setHasVideo(false)}
        />

        {/* Procedural fallback so every shape is demoable before a real asset. */}
        {!hasVideo && !isShader ? (
          <div className="testpattern" style={maskStyle} aria-hidden />
        ) : null}

        {format.overlay === "island" ? <div className="ov-island" /> : null}
        {format.overlay === "hinge" ? <div className="ov-hinge" /> : null}
        {format.overlay === "weather" ? (
          <div className="ov-weather">
            <div className="ov-weather__temp">3°C</div>
            <div className="ov-weather__meta">Kitchen · Milk: fresh</div>
            <div className="ov-weather__list">
              <span>Milk Duds</span>
              <span>Leftover moussaka</span>
              <span>1 (one) lime</span>
            </div>
          </div>
        ) : null}

        {format.mask === "porthole" ? <div className="ov-porthole" /> : null}
      </div>
    </div>
  );
}
