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
  /** Longer "Learn More" description, revealed on expand. */
  blurb: string;
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
    blurb:
      "Captured on cameras the size of a washing machine and roughly as quiet. The frame extends so far above and below the action that, at points, you will forget your own name and possibly your PIN.",
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
    blurb:
      "The ratio of prestige cinema and men who own a projector. Here, letterboxing is not a compromise; it is a lifestyle, and it is not up for discussion.",
    spec: "2.39:1",
    category: "prestige",
    aspect: 2.39,
    renderer: "css",
  },
  {
    id: "academy",
    name: "Academy",
    tagline: "The ratio your grandparents wept in.",
    blurb:
      "Nearly square, deeply serious. The way films looked before anyone had opinions about bars, aspect ratios, or the correct way to hold a phone.",
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
    blurb:
      "Engineered for spreadsheets and precisely one videogame. The Odyssey merely visits, sharing the panel with a half-finished email and your calendar.",
    spec: "21:9 (2.33:1)",
    category: "wide",
    aspect: 21 / 9,
    renderer: "css",
  },
  {
    id: "superultrawide",
    name: "Super-Ultrawide",
    tagline: "You will lose the actors. That is the point.",
    blurb:
      "Two monitors' worth of ambition fused into a single curved slab. Peripheral characters are now, quite literally, peripheral. Turn your head to see the ending.",
    spec: "32:9 (3.56:1)",
    category: "wide",
    aspect: 32 / 9,
    renderer: "css",
  },
  {
    id: "transit",
    name: "Transit Strip Display",
    tagline: "Gate B14 is now boarding this masterpiece.",
    blurb:
      "Mounted above the departures desk, refreshing every forty seconds to remind you the flight is delayed. Homer, a man who took ten years to get home, would understand.",
    spec: "≈8:1",
    category: "wide",
    aspect: 8,
    renderer: "css",
  },
  {
    id: "timessquare",
    name: "Times Square Billboard",
    tagline: "Experienced from the sidewalk, beside a costumed Elmo.",
    blurb:
      "Best appreciated at street level with the neck fully craned, as a man dressed as a beloved cartoon character firmly requests a photography fee.",
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
    blurb:
      "Held vertically, as the algorithm demands. Filmmaker Mode ensures the notch crops only the most important four percent of every shot, for tension.",
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
    blurb:
      "Optimized for the three seconds before a thumb swipes it into oblivion. A returning war hero has never felt more skippable. Add a trending sound to boost reach.",
    spec: "9:16 (0.5625:1)",
    category: "vertical",
    aspect: 9 / 16,
    renderer: "css",
  },
  {
    id: "fridge",
    name: "Samsung Family Hub™ Fridge",
    tagline: "Peak cinema, keeping your Milk Duds at a crisp 3°C.",
    blurb:
      "The 21.5-inch door panel presents the epic in crisp portrait while a helpful widget obscures the hero with today's forecast and a gentle reminder that you are low on limes.",
    spec: '9:16 portrait · 21.5" panel',
    category: "vertical",
    aspect: 9 / 16,
    renderer: "css",
    overlay: "weather",
    badge: "Certified Chilled™",
  },
  {
    id: "fitband",
    name: "Fitness Band",
    tagline: "10,000 steps toward Ithaca.",
    blurb:
      "A vertical slit of cinema, glimpsed between heart-rate readings. You will burn approximately four calories per act and receive a buzz when the sirens sing.",
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
    blurb:
      "Cropped square, filtered warm, captioned with a single wave emoji. Everyone who double-taps will simply assume you were personally at Troy.",
    spec: "1:1",
    category: "square",
    aspect: 1,
    renderer: "css",
  },
  {
    id: "fold",
    name: "Foldable (Unfolded)",
    tagline: "Now with a scenic crease down the protagonist's face.",
    blurb:
      "Unfolds to reveal a majestic near-square, marred only by a permanent hinge crease that runs directly down the protagonist's face at the emotional climax.",
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
    blurb:
      "The entire odyssey, delivered to your wrist in a tasteful circle that dims automatically the instant you lower your arm to see where you are walking.",
    spec: "1:1 · circular",
    category: "round",
    aspect: 1,
    renderer: "mask",
    mask: "circle",
    badge: "Wrist-Certified™",
  },
  {
    id: "porthole",
    name: "Porthole",
    tagline: "Best appreciated mid-voyage, ideally a little seasick.",
    blurb:
      "Viewed through the thick convex glass of a ship's porthole — brass-rimmed, salt-flecked, and gently bulging at the center. The corners of the frame now belong to the sea.",
    spec: "circular · convex glass",
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
    blurb:
      "Rendered in four immortal shades of green on a display that demands a desk lamp, a steady hand, and unshakeable faith that the boat is on the left.",
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
    blurb:
      "Eighty-four by forty-eight pixels of pure, dithered drama. Survives a three-storey drop, a decade in a drawer, and any attempt to identify which shape is Odysseus.",
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
    blurb:
      "Refreshing at approximately one frame per second, the trailer becomes a series of contemplative charcoal etchings. Allow a full afternoon for the runtime.",
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
