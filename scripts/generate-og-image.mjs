#!/usr/bin/env node
// Generates public/images/og-image.jpg (1200x630) matching the site's hero:
// pink-glowing disco ball + DISKOHEINZ logo on a #131313 background.
//
// The glow is a radial gradient from the accent color (#fd3692) out to fully
// transparent, composited over the background — no white-tinted screen blend.
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicImages = path.join(root, "public", "images");

const W = 1200;
const H = 630;
const BG = "#131313";
const ACCENT = "#fd3692";

const DISCO_SIZE = 420;
const LOGO_WIDTH = 720;

// Build a full-canvas SVG background: base color, a subtle vignette, and a
// soft pink radial halo centered behind where the disco ball will sit.
function backgroundSvg() {
  const cx = W / 2;
  const cy = H / 2 - 25; // matches the disco ball offset below

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Tight inner halo: strong accent close to the ball, fading fast -->
    <radialGradient id="haloInner" cx="${cx}" cy="${cy}" r="260" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="${ACCENT}" stop-opacity="0.55" />
      <stop offset="55%"  stop-color="${ACCENT}" stop-opacity="0.18" />
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0" />
    </radialGradient>
    <!-- Wide outer bloom: soft accent wash across the composition -->
    <radialGradient id="haloOuter" cx="${cx}" cy="${cy}" r="560" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="${ACCENT}" stop-opacity="0.22" />
      <stop offset="60%"  stop-color="${ACCENT}" stop-opacity="0.06" />
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="vignette" cx="${W / 2}" cy="${H / 2}" r="${W * 0.6}" gradientUnits="userSpaceOnUse">
      <stop offset="55%"  stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.6" />
    </radialGradient>
    <linearGradient id="accentLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="${ACCENT}" stop-opacity="0" />
      <stop offset="50%"  stop-color="${ACCENT}" stop-opacity="0.85" />
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0" />
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="${BG}" />
  <rect width="100%" height="100%" fill="url(#haloOuter)" />
  <rect width="100%" height="100%" fill="url(#haloInner)" />
  <rect width="100%" height="100%" fill="url(#vignette)" />

  <!-- Thin accent hairline above the tagline -->
  <rect x="380" y="${H - 82}" width="${W - 760}" height="1" fill="url(#accentLine)" />

  <!-- Tagline -->
  <text x="${W / 2}" y="${H - 50}"
        text-anchor="middle"
        fill="#c4c7c8"
        font-family="'Space Grotesk', 'Inter', 'Helvetica Neue', Arial, sans-serif"
        font-size="20"
        font-weight="500"
        letter-spacing="8">
    TECHNO · HOUSE · DISCO · SOUL
  </text>
</svg>`;
}

async function main() {
  const discoPath = path.join(publicImages, "disco.png");
  const logoPath = path.join(publicImages, "logo_1280x627.png");
  const outPath = path.join(publicImages, "og-image.jpg");

  // Centered geometry.
  const centerX = Math.round(W / 2);
  const centerY = Math.round(H / 2);

  // 1. Background canvas with radial halo + vignette + tagline.
  const background = await sharp(Buffer.from(backgroundSvg())).png().toBuffer();

  // 2. Resize disco ball.
  const discoResized = await sharp(discoPath)
    .resize(DISCO_SIZE, DISCO_SIZE, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  // 3. Logo (preserve 1280:627 aspect ratio).
  const logoHeight = Math.round((LOGO_WIDTH * 627) / 1280);
  const logoResized = await sharp(logoPath)
    .resize(LOGO_WIDTH, logoHeight, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const discoLeft = Math.round(centerX - DISCO_SIZE / 2);
  const discoTop = Math.round(centerY - DISCO_SIZE / 2 - 25);
  const logoLeft = Math.round(centerX - LOGO_WIDTH / 2);
  const logoTop = Math.round(centerY - logoHeight / 2 + 5);

  // 4. Composite: background (with radial halos) → disco ball → logo.
  await sharp(background)
    .composite([
      { input: discoResized, left: discoLeft, top: discoTop, opacity: 0.7 },
      { input: logoResized, left: logoLeft, top: logoTop },
    ])
    .jpeg({ quality: 90, chromaSubsampling: "4:4:4", mozjpeg: true })
    .toFile(outPath);

  console.log(`Wrote ${path.relative(root, outPath)} (${W}x${H})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
