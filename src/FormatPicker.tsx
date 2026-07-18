import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  FORMATS,
  type FormatDescriptor,
} from "./formats.ts";

interface Props {
  activeId: string;
  onSelect: (f: FormatDescriptor) => void;
}

/** A little aspect-ratio / shape diagram, echoing the original's formatGraphic. */
function FormatGlyph({ f }: { f: FormatDescriptor }) {
  if (f.mask === "circle" || f.mask === "porthole") {
    return (
      <svg className="glyph" viewBox="0 0 30 28" aria-hidden>
        <circle cx="15" cy="14" r="12" />
      </svg>
    );
  }
  const maxW = 26;
  const maxH = 22;
  let w = maxW;
  let h = maxW / f.aspect;
  if (h > maxH) {
    h = maxH;
    w = maxH * f.aspect;
  }
  w = Math.max(2.5, Math.min(maxW, w));
  h = Math.max(2.5, Math.min(maxH, h));
  const x = (30 - w) / 2;
  const y = (28 - h) / 2;
  return (
    <svg className="glyph" viewBox="0 0 30 28" aria-hidden>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="1.5"
        strokeDasharray={f.category === "lofi" ? "2 1.5" : undefined}
      />
    </svg>
  );
}

export function FormatPicker({ activeId, onSelect }: Props) {
  return (
    <nav className="selector" aria-label="Choose a format">
      {CATEGORY_ORDER.map((cat) => {
        const items = FORMATS.filter((f) => f.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat} className="selector__group">
            <span className="selector__label">{CATEGORY_LABELS[cat]}</span>
            {items.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`fbtn ${f.id === activeId ? "fbtn--active" : ""}`}
                onClick={() => onSelect(f)}
                title={`${f.spec} — ${f.tagline}`}
              >
                <FormatGlyph f={f} />
                <span className="fbtn__name">{f.name}</span>
              </button>
            ))}
          </div>
        );
      })}
    </nav>
  );
}
