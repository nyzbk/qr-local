#!/usr/bin/env node
/**
 * Mark three-checks:
 * 1. Security — no POST/PUT of payload / WiFi / logo; no QR APIs
 * 2. Functional encode — URL PNG decodes; WiFi payload round-trips
 * 3. Custom + errors — logo still decodes; empty CTA; overflow; HEIC; SVG; contrast
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import jsQR from "jsqr";
import { PNG } from "pngjs";

const BASE = process.env.MARK_CHECK_URL || "http://127.0.0.1:8080";
const OUT = "/workspace/screenshots";
mkdirSync(OUT, { recursive: true });
mkdirSync("/workspace/tmp", { recursive: true });

const CHECK_URL = "https://example.com/mark-check";
const posts = [];
const qrApis = [];

const result = {
  security: { pass: false, posts: [], qrApis: [] },
  urlEncode: { pass: false, decoded: "" },
  wifi: { pass: false, payload: "" },
  logo: { pass: false, decoded: "" },
  empty: { pass: false, disabled: false },
  overflow: { pass: false, message: "" },
  heic: { pass: false, message: "" },
  svg: { pass: false, startsWithSvg: false },
  contrast: { pass: false },
  legal: {},
  adsTxt: {},
  ctaHeight: 0,
};

function decodePng(buf) {
  const png = PNG.sync.read(buf);
  const code = jsQR(new Uint8ClampedArray(png.data.buffer), png.width, png.height);
  return code?.data ?? "";
}

function makeLogoPng() {
  const png = new PNG({ width: 32, height: 32 });
  for (let y = 0; y < 32; y++) {
    for (let x = 0; x < 32; x++) {
      const i = (y * 32 + x) << 2;
      png.data[i] = 220;
      png.data[i + 1] = 38;
      png.data[i + 2] = 38;
      png.data[i + 3] = 255;
    }
  }
  return PNG.sync.write(png);
}

writeFileSync("/workspace/tmp/mark-logo.png", makeLogoPng());
writeFileSync("/workspace/tmp/photo.heic", Buffer.from("ftypheic dummy"));

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ acceptDownloads: true, viewport: { width: 1280, height: 900 } });

page.on("request", (req) => {
  const method = req.method();
  const url = req.url();
  if (/qrserver|goqr|chart\.googleapis|api\.qrserver/i.test(url)) {
    qrApis.push({ method, url });
  }
  if (["POST", "PUT"].includes(method)) {
    const postData = req.postData() || "";
    const interesting =
      postData.includes("mark-check") ||
      postData.includes("WIFI:") ||
      postData.includes("Guest") ||
      postData.includes("secret") ||
      postData.includes("BEGIN:VCARD") ||
      /image\/|application\/octet-stream/.test(req.headers()["content-type"] || "");
    if (interesting || postData.length > 200) {
      posts.push({ method, url, note: interesting ? "payload-like" : "large body" });
    }
  }
});

try {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  const pngBtn = page.getByTestId("download-png").first();
  result.empty.disabled = await pngBtn.isDisabled();
  result.empty.pass = result.empty.disabled === true;

  await page.getByTestId("payload-url").fill(CHECK_URL);
  await page.getByTestId("qr-canvas").waitFor({ timeout: 15000 });
  const box = await pngBtn.boundingBox();
  result.ctaHeight = box?.height ?? 0;

  const [pngDownload] = await Promise.all([
    page.waitForEvent("download", { timeout: 15000 }),
    pngBtn.click(),
  ]);
  const pngPath = `${OUT}/mark-url.png`;
  await pngDownload.saveAs(pngPath);
  result.urlEncode.decoded = decodePng(readFileSync(pngPath));
  result.urlEncode.pass = result.urlEncode.decoded === CHECK_URL;
  await page.screenshot({ path: `${OUT}/mark-url.png.png`, fullPage: true });

  const [svgDownload] = await Promise.all([
    page.waitForEvent("download", { timeout: 15000 }),
    page.getByTestId("download-svg").first().click(),
  ]);
  const svgPath = `${OUT}/mark-url.svg`;
  await svgDownload.saveAs(svgPath);
  const svgText = readFileSync(svgPath, "utf8").trim();
  result.svg.startsWithSvg = svgText.includes("<svg");
  result.svg.pass = result.svg.startsWithSvg;

  await page.getByRole("radio", { name: "WiFi", exact: true }).first().click();
  await page.getByTestId("wifi-ssid").fill("Guest");
  await page.getByTestId("wifi-password").fill("secret");
  await page.getByTestId("qr-canvas").waitFor({ timeout: 10000 });
  const wifiPayload = await page.getByTestId("qr-canvas").getAttribute("data-payload");
  result.wifi.payload = wifiPayload || "";
  result.wifi.pass = /WIFI:T:WPA;S:Guest;P:secret/.test(result.wifi.payload);

  await page.getByRole("radio", { name: "URL", exact: true }).first().click();
  await page.getByTestId("payload-url").fill(CHECK_URL);
  await page.getByTestId("qr-canvas").waitFor({ timeout: 10000 });
  await page.getByTestId("logo-input").setInputFiles("/workspace/tmp/mark-logo.png");
  await page.getByText("High error correction is required for a logo").waitFor({ timeout: 8000 });
  await page.waitForTimeout(400);
  const [logoDownload] = await Promise.all([
    page.waitForEvent("download", { timeout: 15000 }),
    page.getByTestId("download-png").first().click(),
  ]);
  const logoPath = `${OUT}/mark-logo-qr.png`;
  await logoDownload.saveAs(logoPath);
  result.logo.decoded = decodePng(readFileSync(logoPath));
  result.logo.pass = result.logo.decoded === CHECK_URL;

  await page.getByTestId("logo-input").setInputFiles("/workspace/tmp/photo.heic");
  const heicAlert = page.getByTestId("logo-error");
  await heicAlert.waitFor({ timeout: 8000 });
  result.heic.message = (await heicAlert.innerText()).trim();
  result.heic.pass = /HEIC Local/i.test(result.heic.message);

  await page.getByRole("button", { name: "Remove logo" }).click();
  await page.getByRole("radio", { name: "Text", exact: true }).first().click();
  await page.getByTestId("payload-text").fill("A".repeat(4000));
  const overflow = page.getByTestId("encode-error");
  await overflow.waitFor({ timeout: 10000 });
  result.overflow.message = (await overflow.innerText()).trim();
  result.overflow.pass = /capacity|shorten/i.test(result.overflow.message);

  await page.getByRole("radio", { name: "URL", exact: true }).first().click();
  await page.getByTestId("payload-url").fill(CHECK_URL);
  await page.getByTestId("color-fg-text").fill("#ffff00");
  await page.getByTestId("contrast-warning").waitFor({ timeout: 8000 });
  result.contrast.pass = true;
  await page.screenshot({ path: `${OUT}/mark-contrast.png`, fullPage: true });

  for (const path of ["/privacy", "/terms", "/about", "/ads.txt", "/wifi", "/vcard"]) {
    const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    result.legal[path] = res?.status() ?? 0;
  }
  const ads = await (await page.goto(BASE + "/ads.txt")).text();
  result.adsTxt.body = ads.trim();
  result.adsTxt.pass = ads.includes("google.com, pub-7636435144500691, DIRECT, f08c47fec0942fa0");

  result.security.posts = posts;
  result.security.qrApis = qrApis;
  result.security.pass = posts.length === 0 && qrApis.length === 0;
} finally {
  await browser.close();
}

const allPass =
  result.security.pass &&
  result.urlEncode.pass &&
  result.wifi.pass &&
  result.logo.pass &&
  result.empty.pass &&
  result.overflow.pass &&
  result.heic.pass &&
  result.svg.pass &&
  result.contrast.pass &&
  result.adsTxt.pass &&
  result.ctaHeight >= 44 &&
  ["/privacy", "/terms", "/about"].every((p) => result.legal[p] === 200);

writeFileSync(`${OUT}/mark-three-checks.json`, JSON.stringify({ allPass, result }, null, 2));
console.log(JSON.stringify({ allPass, result }, null, 2));
process.exit(allPass ? 0 : 1);
