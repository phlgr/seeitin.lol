# See It In™ — seeitin.lol

A parody of the official "The Odyssey" format-comparison site. Pick a screen —
IMAX 70mm, a Samsung fridge, a round smartwatch, a Game Boy — and the trailer
reframes, masks, and degrades to match the hardware it "deserves."

## Run

```bash
npm install
npm run dev
```

Drop a video at `public/trailer.mp4` (or pass `?src=<url>` in the browser).
With no video present, the stage shows a procedural test pattern so every
format — including the shader tier — is still demoable.

## Architecture

Every screen is one `FormatDescriptor` in `src/formats.ts` (aspect ratio +
renderer + optional mask/shader/overlay). `Stage.tsx` fits a box of that aspect
ratio inside the stage (auto letterbox/pillarbox) and dispatches to one of three
rendering tiers:

- **css** — rectangular targets. Plain `object-fit: cover` in an aspect box.
- **mask** — round geometry via `clip-path: circle()` (+ vignette/scale for the
  porthole). _Note: porthole fisheye is currently an approximation — a real
  WebGL lens warp is the follow-up._
- **shader** — `ShaderCanvas.tsx` downscales to the device's true resolution,
  applies a palette/dither pass (Game Boy 4-green, Nokia mono, e-ink grayscale
  at ~1fps), and upscales nearest-neighbor. This is the shareable tier.

Overlays (fridge weather widget, phone notch, foldable hinge) render on top.

## Adding a format

Append to `FORMATS` in `src/formats.ts`. No other file needs to change unless
you introduce a new mask/shader/overlay kind.
