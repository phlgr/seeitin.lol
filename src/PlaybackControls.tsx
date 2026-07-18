import { useEffect, useState } from "react";

function fmt(s: number): string {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${m}:${ss.toString().padStart(2, "0")}`;
}

/** The player transport bar, echoing the original's controls/timeline. */
export function PlaybackControls({ video }: { video: HTMLVideoElement | null }) {
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    if (!video) return;
    const onTime = () => setTime(video.currentTime);
    const onDur = () => setDur(video.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onDur);
    video.addEventListener("durationchange", onDur);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    setDur(video.duration || 0);
    setPlaying(!video.paused);
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onDur);
      video.removeEventListener("durationchange", onDur);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [video]);

  const pct = dur > 0 ? (time / dur) * 100 : 0;

  const toggle = () => {
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };
  const replay = () => {
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  };
  const seek = (clientX: number, el: HTMLElement) => {
    if (!video || dur <= 0) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    video.currentTime = x * dur;
    setTime(x * dur);
  };

  return (
    <div className="controls">
      <button
        type="button"
        className="ctrl-btn"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? "❚❚" : "▶"}
      </button>
      <button
        type="button"
        className="ctrl-btn"
        onClick={replay}
        aria-label="Replay"
      >
        ↺
      </button>
      <span className="ctrl-time">{fmt(time)}</span>
      <div
        className="ctrl-track"
        role="slider"
        aria-label="Seek"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          seek(e.clientX, e.currentTarget);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) seek(e.clientX, e.currentTarget);
        }}
      >
        <div className="ctrl-fill" style={{ width: `${pct}%` }}>
          <span className="ctrl-knob" />
        </div>
      </div>
      <span className="ctrl-time">{fmt(dur)}</span>
    </div>
  );
}
