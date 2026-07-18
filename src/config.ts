// Where the "trailer" comes from. Defaults to the official Odyssey aspect-ratio
// trailer hotlinked from Universal's CloudFront bucket (CORS: allow-origin *,
// so the canvas shader tier can sample it without tainting). Override with a
// local file via ?src=/trailer.mp4, or any other URL via ?src=<url>.
const params = new URLSearchParams(window.location.search);
export const TRAILER_SRC =
  params.get("src") ??
  "https://dx35vtwkllhj9.cloudfront.net/universalstudios/the-odyssey/video/imax-fallback-trailer.mp4";

// Matching poster frame from the same bucket (shown while the video buffers).
export const TRAILER_POSTER =
  "https://dx35vtwkllhj9.cloudfront.net/universalstudios/the-odyssey/images/compare-formats-trailer-poster.webp";

// If the video is missing/blocked, the Stage falls back to a procedural
// test pattern so every format (including the shader tier) is still demoable.
