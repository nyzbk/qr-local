import { LOGO_MAX_RATIO, LOGO_PAD, MAX_LOGO_BYTES } from "./constants";

export function isHeicFile(file: File): boolean {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return (
    name.endsWith(".heic") ||
    name.endsWith(".heif") ||
    type === "image/heic" ||
    type === "image/heif" ||
    type === "image/heic-sequence"
  );
}

export function logoFileError(file: File): string | null {
  if (isHeicFile(file)) return "HEIC logos are not supported here. Convert in HEIC Local first.";
  if (file.size > MAX_LOGO_BYTES) return "Logo is too large — use a file under 2 MB.";
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  const okType =
    type.startsWith("image/png") ||
    type.startsWith("image/jpeg") ||
    type.startsWith("image/webp") ||
    type.startsWith("image/svg") ||
    type === "" ||
    /\.(png|jpe?g|webp|svg)$/.test(name);
  if (!okType) return "Use a PNG, JPG, WebP or SVG logo.";
  return null;
}

export async function fileToBitmap(file: File): Promise<ImageBitmap> {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    await image.decode();
    return await createImageBitmap(image);
  } catch {
    throw new Error("Couldn’t read this image");
  } finally {
    URL.revokeObjectURL(url);
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export function drawLogo(canvas: HTMLCanvasElement, logo: ImageBitmap, bg: string): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const qrSize = Math.min(canvas.width, canvas.height);
  const maxLogo = qrSize * LOGO_MAX_RATIO;
  const scale = Math.min(maxLogo / logo.width, maxLogo / logo.height);
  const drawW = logo.width * scale;
  const drawH = logo.height * scale;
  const x = (canvas.width - drawW) / 2;
  const y = (canvas.height - drawH) / 2;
  const padX = drawW * LOGO_PAD;
  const padY = drawH * LOGO_PAD;
  ctx.fillStyle = bg;
  roundRect(ctx, x - padX / 2, y - padY / 2, drawW + padX, drawH + padY, Math.min(drawW, drawH) * 0.18);
  ctx.fill();
  ctx.drawImage(logo, x, y, drawW, drawH);
}
