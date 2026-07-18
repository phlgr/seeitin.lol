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

export function FormatPicker({ activeId, onSelect }: Props) {
  return (
    <div className="picker">
      {CATEGORY_ORDER.map((cat) => {
        const items = FORMATS.filter((f) => f.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="picker__group">
            <h3 className="picker__heading">{CATEGORY_LABELS[cat]}</h3>
            <div className="picker__row">
              {items.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`chip ${f.id === activeId ? "chip--active" : ""}`}
                  onClick={() => onSelect(f)}
                  title={f.tagline}
                >
                  <span className="chip__name">{f.name}</span>
                  <span className="chip__spec">{f.spec}</span>
                </button>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
