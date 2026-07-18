// Where the "trailer" comes from. Drop your file at public/trailer.mp4,
// or override at runtime with ?src=<url> (e.g. a hotlinked trailer).
const params = new URLSearchParams(window.location.search);
export const TRAILER_SRC = params.get("src") ?? "/trailer.mp4";

// If the video is missing/blocked, the Stage falls back to a procedural
// test pattern so every format (including the shader tier) is still demoable.
