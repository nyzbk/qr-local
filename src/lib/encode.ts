import type { EncodeOptions } from "./types";

type QrcodeModule = {
  toCanvas: (
    canvas: HTMLCanvasElement,
    text: string,
    options?: Record<string, unknown>,
  ) => Promise<HTMLCanvasElement>;
  toString: (text: string, options?: Record<string, unknown>) => Promise<string>;
};

let qrcodePromise: Promise<QrcodeModule> | null = null;

async function loadQrcode(): Promise<QrcodeModule> {
  if (!qrcodePromise) {
    qrcodePromise = import("qrcode").then((mod) => {
      const lib = ((mod as unknown as { default?: QrcodeModule }).default ??
        (mod as unknown as QrcodeModule)) as QrcodeModule;
      return lib;
    });
  }
  return qrcodePromise;
}

export function isCapacityError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /too (big|large)|overflow|capacity|cannot be encoded|data too long/i.test(message);
}

export function humanEncodeError(error: unknown): string {
  if (isCapacityError(error)) return "Shorten this text — QR capacity exceeded";
  if (error instanceof Error && error.message) return error.message;
  return "Could not encode this payload";
}

function canvasOptions(options: EncodeOptions) {
  return {
    errorCorrectionLevel: options.ecc,
    margin: options.margin,
    width: options.size,
    color: { dark: options.fg, light: options.bg },
  };
}

export async function encodeToCanvas(payload: string, options: EncodeOptions): Promise<HTMLCanvasElement> {
  const QRCode = await loadQrcode();
  const canvas = document.createElement("canvas");
  await QRCode.toCanvas(canvas, payload, canvasOptions(options));
  return canvas;
}

export async function encodeToSvg(payload: string, options: EncodeOptions): Promise<string> {
  const QRCode = await loadQrcode();
  const svg = await QRCode.toString(payload, {
    type: "svg",
    errorCorrectionLevel: options.ecc,
    margin: options.margin,
    width: options.size,
    color: { dark: options.fg, light: options.bg },
  });
  return svg;
}
