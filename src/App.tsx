import { useState } from "react";
import { DEFAULT_FORMAT_ID, getFormat } from "./formats.ts";
import { FormatPicker } from "./FormatPicker.tsx";
import { Stage } from "./Stage.tsx";
import { PlaybackControls } from "./PlaybackControls.tsx";

export function App() {
  const [activeId, setActiveId] = useState(DEFAULT_FORMAT_ID);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const format = getFormat(activeId);

  const select = (id: string) => {
    setActiveId(id);
    setExpanded(false);
  };

  return (
    <div className="app">
      <header className="masthead">
        <div className="masthead__kicker">See It In™</div>
        <h1 className="masthead__title">The Odyssey</h1>
      </header>

      <main className="showcase">
        <Stage format={format} video={videoEl} onVideo={setVideoEl} />
        <PlaybackControls video={videoEl} />
        <div className="showcase__meta">
          <div className="showcase__lead">See it in</div>
          <h2 className="showcase__name">{format.name}</h2>
          <p className="showcase__tagline">{format.tagline}</p>
          <div className="showcase__spec">
            {format.spec}
            {format.badge ? (
              <span className="showcase__badge"> · {format.badge}</span>
            ) : null}
          </div>
          <button
            type="button"
            className="learnmore"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Less ▴" : "Learn More ▾"}
          </button>
          <p className={`blurb ${expanded ? "blurb--open" : ""}`}>
            {format.blurb}
          </p>
        </div>
      </main>

      <FormatPicker activeId={activeId} onSelect={(f) => select(f.id)} />

      <footer className="footer">
        <p className="footer__fine">
          See It In™ is a parody, not affiliated with any studio, appliance
          manufacturer, or handheld console. “IMAX” is a trademark of its
          respective owner, referenced here for the bit.
        </p>
      </footer>
    </div>
  );
}
