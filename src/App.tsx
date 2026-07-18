import { useState } from "react";
import { DEFAULT_FORMAT_ID, getFormat } from "./formats.ts";
import { FormatPicker } from "./FormatPicker.tsx";
import { Stage } from "./Stage.tsx";

export function App() {
  const [activeId, setActiveId] = useState(DEFAULT_FORMAT_ID);
  const format = getFormat(activeId);

  return (
    <div className="app">
      <header className="masthead">
        <div className="masthead__kicker">A FridgeMax™ Premium Presentation</div>
        <h1 className="masthead__title">The Odyssey</h1>
        <p className="masthead__sub">
          Experience the cinematic event of a generation in the format its
          hardware deserves. Expand your view. Then crop it. Then dither it.
        </p>
      </header>

      <main className="showcase">
        <Stage format={format} />
        <div className="showcase__meta">
          <h2 className="showcase__name">{format.name}</h2>
          <p className="showcase__tagline">{format.tagline}</p>
        </div>
      </main>

      <FormatPicker activeId={activeId} onSelect={(f) => setActiveId(f.id)} />

      <footer className="footer">
        <button type="button" className="cta" disabled>
          Find a screening near you ▸
        </button>
        <p className="footer__fine">
          FridgeMax™ is a parody and is not affiliated with, endorsed by, or
          cooled to the correct temperature by any studio, appliance
          manufacturer, or handheld console. No Milk Duds were harmed. “IMAX” is
          a trademark of its respective owner, referenced here for the bit.
        </p>
      </footer>
    </div>
  );
}
