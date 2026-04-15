import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB

export async function saveFlyer(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Datei ist kein Bild.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Bild ist größer als 8 MB.");
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const id = crypto.randomUUID();
  const filename = `${id}.webp`;
  const targetPath = path.join(UPLOAD_DIR, filename);

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await sharp(buf)
    .rotate() // respect EXIF orientation
    .resize(800, 800, { fit: "cover", position: "center" })
    .webp({ quality: 85 })
    .toFile(targetPath);

  return `/uploads/${filename}`;
}

export async function deleteFlyerIfOwned(flyerUrl: string | null | undefined) {
  if (!flyerUrl) return;
  if (!flyerUrl.startsWith("/uploads/")) return; // nur eigene Uploads löschen
  const filename = flyerUrl.slice("/uploads/".length);
  if (!/^[a-z0-9-]+\.webp$/i.test(filename)) return; // safety
  const full = path.join(UPLOAD_DIR, filename);
  try {
    await fs.unlink(full);
  } catch {
    // ignore missing files
  }
}

export function uploadPath(filename: string): string {
  return path.join(UPLOAD_DIR, filename);
}
