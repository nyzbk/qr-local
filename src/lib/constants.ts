import type { EccLevel, PayloadType, QuietZone, QrSize } from "./types";

export const APP_NAME = "Mark";
export const APP_TAGLINE = "Free QR Code Generator";
export const APP_DESCRIPTION =
  "Create QR codes for links, WiFi and vCards in your browser. Custom colors, logo, PNG and SVG. No signup, no watermark, nothing uploaded.";

export const SITE_ORIGIN = "https://qr-local.vercel.app";
export const CONTACT_EMAIL = "ultaultimatum@gmail.com";
export const OPERATOR_NAME = "Ultimatum";
export const CONTENT_UPDATED = "28 August 2026";

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
    q: "Does my URL, WiFi password or vCard leave this device?",
    a: "No. Mark encodes the payload in this browser tab with a JavaScript library and Canvas. We do not POST the text, the WiFi password, the vCard fields or the logo file to a QR API. Closing the tab drops the in-memory strings. Hosting logs may record that you requested a page, not what you typed into the generator.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no signup, no email gate and no login wall before download. The generator is the homepage.",
  },
  {
    q: "Is there a watermark or a daily limit?",
    a: "No watermark is drawn on the PNG or SVG. There is no credit counter. The only ceiling is what the device can render: very long payloads hit QR capacity, and a huge logo may be rejected.",
  },
  {
    q: "Does it work on iPhone Safari?",
    a: "Yes. iOS Safari is a critical path. Download uses a file link; if iOS ignores the download attribute, use Share. Clipboard copy is extra and may be blocked — Download still works. HEIC logos are not read here; convert the logo first.",
  },
  {
    q: "Should I download PNG or SVG?",
    a: "SVG is a vector of the modules. Use it for print when there is no logo. A logo is a raster overlay, so that path is PNG only — the SVG button stays off so we do not pretend a flattened bitmap is lossless vector.",
  },
  {
    q: "Can I put a logo in the code?",
    a: "Yes, a PNG, JPEG, WebP or SVG logo, centered, about 18% of the square, with a pad so finder patterns at the three corners stay clear. Mark forces error correction H when a logo is present. Always scan the result with your own phone before you print a run of stickers.",
  },
  {
    q: "Will a colored QR still scan?",
    a: "Dark modules on a light background scan most reliably. If the contrast between foreground and background falls below about 4.5:1 we show a warning. You can still download; some cameras will fail. Yellow on white is a typical miss. Keep a quiet zone (the margin) around the modules.",
  },
  {
    q: "Can I make a guest WiFi QR?",
    a: "Yes. Switch to WiFi, enter the SSID, choose WPA/WPA2, WEP or open, and the password. Mark builds the WIFI:T:…;S:…;P:…;; string, including escapes for ; , : and \\. A phone camera can join without typing the password. Do not encode a network you are not allowed to share.",
  },
  {
    q: "Why is this on a vercel.app URL — is that safe?",
    a: "qr-local.vercel.app is the public HTTPS host for this app. HTTPS is valid and there is no password on the site. The subdomain is not a custom brand domain. Safety of the code you generate depends on the URL or WiFi you type, not on the host name. We do not sell a short-link redirect in front of your payload.",
  },
  {
    q: "When do ads appear, and do you ask people to click them?",
    a: "AdSense code is in the document head for site review. Visible ad units stay off until the site is Ready in AdSense. We never ask you to click ads. Primary actions — generate, download PNG, download SVG — stay clear of ad slots.",
  },
  {
    q: "Who runs Mark and how do I get in touch?",
    a: `Mark is operated by ${OPERATOR_NAME}. Email ${CONTACT_EMAIL} with the page URL, browser, and what you expected. Do not send WiFi passwords or personal vCards to that inbox — we will not encode them for you, and you should not put secrets in email.`,
  },
  {
    q: "What is Mark not?",
    a: "It is not a dynamic QR platform, not a click tracker, not a URL shortener, and not a phishing filter. It does not store a history in the cloud. If you need scan counts or a code you can edit after printing, you need a different product with a server.",
  },
  {
    q: "Why did a long text fail?",
    a: "QR versions have a byte ceiling. A paragraph, a huge vCard or a data URL can exceed it. Mark shows “Shorten this text — QR capacity exceeded” instead of crashing. Split the content or link to a page that holds it.",
  },
  {
    q: "Does the code keep working if I go offline?",
    a: "After the page and script have loaded, encoding does not need a network call. The first visit still loads the app over HTTPS. We do not ship a service-worker cache of your payloads. Refreshing without a network may fail if the browser dropped the document.",
  },
] as const;
