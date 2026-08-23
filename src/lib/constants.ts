import type { EccLevel, PayloadType, QuietZone, QrSize } from "./types";

export const APP_NAME = "Mark";
export const APP_TAGLINE = "Free QR Code Generator";
export const APP_DESCRIPTION =
  "Create QR codes for links, WiFi and vCards in your browser. Custom colors, logo, PNG and SVG. No signup, no watermark, nothing uploaded.";

export const ADSENSE_CLIENT = "ca-pub-7636435144500691";
export const AGENCY_NAME = "Ultimatum";
export const AGENCY_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_AGENCY_URL) ||
  "https://ultimatum.studio";

export const DEFAULT_FG = "#111111";
export const DEFAULT_BG = "#FFFFFF";
export const DEFAULT_ECC: EccLevel = "M";
export const DEFAULT_SIZE: QrSize = 512;
export const DEFAULT_MARGIN: QuietZone = 4;
export const DEFAULT_STEM = "mark-qr";
export const MAX_LOGO_BYTES = 2 * 1024 * 1024;
export const LOGO_MAX_RATIO = 0.18;
export const LOGO_PAD = 0.12;
export const CONTRAST_MIN = 4.5;
export const DEBOUNCE_MS = 150;

export const PAYLOAD_TYPES: { value: PayloadType; label: string }[] = [
  { value: "url", label: "URL" },
  { value: "text", label: "Text" },
  { value: "wifi", label: "WiFi" },
  { value: "vcard", label: "vCard" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "sms", label: "SMS" },
];

export const ECC_OPTIONS: { value: EccLevel; label: string }[] = [
  { value: "L", label: "L" },
  { value: "M", label: "M" },
  { value: "Q", label: "Q" },
  { value: "H", label: "H" },
];

export const SIZE_OPTIONS: { value: QrSize; label: string }[] = [
  { value: 256, label: "256" },
  { value: 512, label: "512" },
  { value: 1024, label: "1024" },
];

export const MARGIN_OPTIONS: { value: QuietZone; label: string }[] = [
  { value: 2, label: "2" },
  { value: 4, label: "4" },
  { value: 8, label: "8" },
];

export const FAQ = [
  {
    q: "Is Mark really private?",
    a: "Yes. Encoding happens in your browser. URLs, WiFi passwords and vCards are not uploaded.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no signup, no email wall, and no watermark on the code.",
  },
  {
    q: "Can I put a logo in the QR?",
    a: "Yes. We switch to high error correction (H) so cameras can still read it. Test before printing.",
  },
  {
    q: "PNG or SVG?",
    a: "SVG for clean print without a logo. PNG when you use a logo or need a raster.",
  },
  {
    q: "Will colored codes scan?",
    a: "High contrast (near-black on white) is safest. We warn if contrast is low.",
  },
  {
    q: "Can I make a WiFi QR for guests?",
    a: "Yes. Type WiFi, enter SSID and password. The phone camera can join the network.",
  },
  {
    q: "Does it work on iPhone?",
    a: "Yes. iOS Safari is a critical path — generate, download, or share the PNG.",
  },
  {
    q: "Is there a watermark or limit?",
    a: "No watermark. No artificial quota beyond what your device can render.",
  },
  {
    q: "What about dynamic QR / scan stats?",
    a: "Not in this free tool — that needs a server. Mark is static and private.",
  },
  {
    q: "Why did my long text fail?",
    a: "QR codes have a capacity limit. Shorten the payload.",
  },
] as const;
