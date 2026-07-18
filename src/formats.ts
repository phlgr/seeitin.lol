export type Renderer = "css" | "mask" | "shader";
export type MaskKind = "circle" | "porthole";
export type ShaderKind = "gameboy" | "nokia" | "eink";
export type OverlayKind = "weather" | "hinge" | "notch";

export type Category =
  | "prestige"
  | "wide"
  | "vertical"
  | "square"
  | "round"
  | "lofi";

export interface FormatDescriptor {
  id: string;
  /** Display name in the picker. */
  name: string;
  /** Reverent premium-cinema marketing line. */
  tagline: string;
  /** Human-readable spec, e.g. "1.43:1 · 70mm". */
  spec: string;
  category: Category;
  /** width / height. Drives the shape of the frame. */
  aspect: number;
  renderer: Renderer;
  mask?: MaskKind;
  shader?: ShaderKind;
  overlay?: OverlayKind;
  /** Optional certification badge shown on the card. */
  badge?: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  prestige: "The Prestige Formats",
  wide: "The Expansive Formats",
  vertical: "The Vertical Formats",
  square: "The Squared Formats",
  round: "The Circular Formats",
  lofi: "The Heritage Formats",
};

export const CATEGORY_ORDER: Category[] = [
  "prestige",
  "wide",
  "vertical",
  "square",
  "round",
  "lofi",
];

export const FORMATS: FormatDescriptor[] = [
  // ── Prestige baseline ──────────────────────────────────────────────
  {
    id: "imax70",
    name: "IMAX® 70mm",
    tagline: "The format the filmmaker begs you not to settle below.",
    spec: "1.43:1 · 70mm film",
    category: "prestige",
    aspect: 1.43,
    renderer: "css",
    badge: "The Filmmaker's Choice™",
  },
  {
    id: "scope",
    name: "Anamorphic Scope",
    tagline: "For those who consider widescreen a personality.",
    spec: "2.39:1",
    category: "prestige",
    aspect: 2.39,
    renderer: "css",
  },
  {
    id: "academy",
    name: "Academy",
    tagline: "The ratio your grandparents wept in.",
    spec: "1.375:1",
    category: "prestige",
    aspect: 1.375,
    renderer: "css",
  },

  // ── Absurdly wide ──────────────────────────────────────────────────
  {
    id: "ultrawide",
    name: "Ultrawide Monitor",
    tagline: "Cinema, but also 47 browser tabs.",
    spec: "21:9 (2.33:1)",
    category: "wide",
    aspect: 21 / 9,
    renderer: "css",
  },
  {
    id: "superultrawide",
    name: "Super-Ultrawide",
    tagline: "You will lose the actors. That is the point.",
    spec: "32:9 (3.56:1)",
    category: "wide",
    aspect: 32 / 9,
    renderer: "css",
  },
  {
    id: "transit",
    name: "Transit Strip Display",
    tagline: "Gate B14 is now boarding this masterpiece.",
    spec: "≈8:1",
    category: "wide",
    aspect: 8,
    renderer: "css",
  },
  {
    id: "timessquare",
    name: "Times Square Billboard",
    tagline: "Experienced from the sidewalk, beside a costumed Elmo.",
    spec: "12:1 (approx.)",
    category: "wide",
    aspect: 12,
    renderer: "css",
    badge: "Certified Enormous™",
  },

  // ── Vertical ───────────────────────────────────────────────────────
  {
    id: "iphone",
    name: "iPhone (Vertical)",
    tagline: "As Christopher Nolan intended: in one thumb's reach.",
    spec: "9:19.5 · Filmmaker Mode",
    category: "vertical",
    aspect: 9 / 19.5,
    renderer: "css",
    overlay: "notch",
  },
  {
    id: "tiktok",
    name: "TikTok / Reels",
    tagline: "The Odyssey, now with a 3-second attention span.",
    spec: "9:16 (0.5625:1)",
    category: "vertical",
    aspect: 9 / 16,
    renderer: "css",
  },
  {
    id: "fridge",
    name: "Samsung Family Hub™ Fridge",
    tagline: "Peak cinema, keeping your Milk Duds at a crisp 3°C.",
    spec: "9:16 portrait · 21.5\" panel",
    category: "vertical",
    aspect: 9 / 16,
    renderer: "css",
    overlay: "weather",
    badge: "FridgeMax Flagship™",
  },
  {
    id: "fitband",
    name: "Fitness Band",
    tagline: "10,000 steps toward Ithaca.",
    spec: "≈1:2.5 vertical slit",
    category: "vertical",
    aspect: 1 / 2.5,
    renderer: "css",
  },

  // ── Square-ish ─────────────────────────────────────────────────────
  {
    id: "instagram",
    name: "Instagram Square",
    tagline: "Perfectly balanced. Deeply cropped. Very sorry.",
    spec: "1:1",
    category: "square",
    aspect: 1,
    renderer: "css",
  },
  {
    id: "fold",
    name: "Foldable (Unfolded)",
    tagline: "Now with a scenic crease down the protagonist's face.",
    spec: "≈1.15:1 · hinge included",
    category: "square",
    aspect: 1.15,
    renderer: "css",
    overlay: "hinge",
  },

  // ── Round / cursed geometry ────────────────────────────────────────
  {
    id: "watch",
    name: "Round Smartwatch",
    tagline: "The most intimate 1.9 inches in cinema.",
    spec: "1:1 · circular",
    category: "round",
    aspect: 1,
    renderer: "mask",
    mask: "circle",
    badge: "Wrist-Certified™",
  },
  {
    id: "porthole",
    name: "Porthole / Peephole",
    tagline: "Someone is at the door. It is the Odyssey.",
    spec: "circular · fisheye",
    category: "round",
    aspect: 1,
    renderer: "mask",
    mask: "porthole",
  },

  // ── Retro / low-fi (the shareable tier) ────────────────────────────
  {
    id: "gameboy",
    name: "Game Boy",
    tagline: "The Aegean, in four tasteful shades of green.",
    spec: "160×144 · 4-color DMG",
    category: "lofi",
    aspect: 160 / 144,
    renderer: "shader",
    shader: "gameboy",
    badge: "Heritage Restoration™",
  },
  {
    id: "nokia",
    name: "Nokia 3310",
    tagline: "Indestructible. Unlike your suspension of disbelief.",
    spec: "84×48 · monochrome",
    category: "lofi",
    aspect: 84 / 48,
    renderer: "shader",
    shader: "nokia",
  },
  {
    id: "eink",
    name: "Kindle E-Ink",
    tagline: "The entire trailer, in roughly nine meditative frames.",
    spec: "4:3 · grayscale · ~1fps",
    category: "lofi",
    aspect: 4 / 3,
    renderer: "shader",
    shader: "eink",
  },
];

export const DEFAULT_FORMAT_ID = "imax70";

export function getFormat(id: string): FormatDescriptor {
  return FORMATS.find((f) => f.id === id) ?? FORMATS[0];
}
