import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ContrastWarn } from "./ContrastWarn";
import { DownloadBar } from "./DownloadBar";
import { LogoDrop } from "./LogoDrop";
import { PayloadForm } from "./PayloadForm";
import { QrPreview } from "./QrPreview";
import { StyleControls } from "./StyleControls";
import { TypeSwitcher } from "./TypeSwitcher";
import { AdUnit } from "./AdUnit";
import { SoftAgencyCta } from "./SoftAgencyCta";
import {
  CONTRAST_MIN,
  DEBOUNCE_MS,
  DEFAULT_BG,
  DEFAULT_ECC,
  DEFAULT_FG,
  DEFAULT_MARGIN,
  DEFAULT_SIZE,
  DEFAULT_STEM,
} from "@/lib/constants";
import { contrastRatio, isLowContrast } from "@/lib/contrast";
import { canvasToPngBlob, copyPng, downloadBlob, sanitizeStem, shareOrDownload } from "@/lib/download";
import { encodeToCanvas, encodeToSvg, humanEncodeError } from "@/lib/encode";
import { drawLogo, fileToBitmap, logoFileError } from "@/lib/logo";
import {
  mailtoPayload,
  payloadBytes,
  smstoPayload,
  telPayload,
  urlNormalize,
  vcardPayload,
  wifiPayload,
} from "@/lib/payloads";
import type {
  EmailFields,
  LogoAsset,
  PayloadType,
  PhoneFields,
  QrSize,
  SmsFields,
  VcardFields,
  WifiFields,
} from "@/lib/types";

const EMPTY_WIFI: WifiFields = { ssid: "", password: "", security: "WPA", hidden: false };
const EMPTY_VCARD: VcardFields = { first: "", last: "", org: "", title: "", phone: "", email: "", url: "" };
const EMPTY_EMAIL: EmailFields = { address: "", subject: "", body: "" };
const EMPTY_PHONE: PhoneFields = { number: "" };
const EMPTY_SMS: SmsFields = { number: "", message: "" };

type Props = { initialType?: PayloadType };

export function MarkApp({ initialType = "url" }: Props) {
  const [type, setType] = useState<PayloadType>(initialType);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [wifi, setWifi] = useState<WifiFields>(EMPTY_WIFI);
  const [vcard, setVcard] = useState<VcardFields>(EMPTY_VCARD);
  const [email, setEmail] = useState<EmailFields>(EMPTY_EMAIL);
  const [phone, setPhone] = useState<PhoneFields>(EMPTY_PHONE);
  const [sms, setSms] = useState<SmsFields>(EMPTY_SMS);
  const [ecc, setEcc] = useState(DEFAULT_ECC);
  const [size, setSize] = useState<QrSize>(DEFAULT_SIZE);
  const [margin, setMargin] = useState(DEFAULT_MARGIN);
  const [fg, setFg] = useState(DEFAULT_FG);
  const [bg, setBg] = useState(DEFAULT_BG);
  const [logo, setLogo] = useState<LogoAsset | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [preview, setPreview] = useState<HTMLCanvasElement | null>(null);
  const [encodeError, setEncodeError] = useState<string | null>(null);
  const [stem, setStem] = useState(DEFAULT_STEM);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const genId = useRef(0);
  const logoRef = useRef<LogoAsset | null>(null);

  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  useEffect(() => {
    const nav = navigator as Navigator & { canShare?: (data?: ShareData) => boolean };
    setCanShare(typeof nav.canShare === "function");
  }, []);

  const payload = useMemo(() => {
    switch (type) {
      case "url":
        return urlNormalize(url);
      case "text":
        return text;
      case "wifi":
        return wifiPayload(wifi);
      case "vcard":
        return vcardPayload(vcard);
      case "email":
        return mailtoPayload(email);
      case "phone":
        return telPayload(phone);
      case "sms":
        return smstoPayload(sms);
    }
  }, [type, url, text, wifi, vcard, email, phone, sms]);

  const empty = payload.trim().length === 0;
  const bytes = empty ? 0 : payloadBytes(payload);
  const eccLocked = !!logo;
  const effectiveEcc = eccLocked ? "H" : ecc;
  const ratio = contrastRatio(fg, bg);
  const lowContrast = isLowContrast(fg, bg, CONTRAST_MIN);

  useEffect(() => {
    if (eccLocked && ecc !== "H") setEcc("H");
  }, [eccLocked, ecc]);

  useEffect(() => {
    if (empty) {
      genId.current += 1;
      setPreview(null);
      setEncodeError(null);
      return;
    }
    const id = ++genId.current;
    const timer = window.setTimeout(async () => {
      const run = async (qrSize: QrSize) => {
        const canvas = await encodeToCanvas(payload, {
          ecc: effectiveEcc,
          size: qrSize,
          margin,
          fg,
          bg,
        });
        if (logoRef.current) drawLogo(canvas, logoRef.current.bitmap, bg);
        return canvas;
      };
      try {
        let canvas: HTMLCanvasElement;
        try {
          canvas = await run(size);
        } catch (err) {
          if (size === 1024) {
            canvas = await run(512);
          } else {
            throw err;
          }
        }
        if (id !== genId.current) return;
        setPreview(canvas);
        setEncodeError(null);
      } catch (err) {
        if (id !== genId.current) return;
        setPreview(null);
        setEncodeError(humanEncodeError(err));
      }
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [empty, payload, effectiveEcc, size, margin, fg, bg, logo]);

  const onLogoFile = useCallback(async (file: File) => {
    const problem = logoFileError(file);
    if (problem) {
      setLogoError(problem);
      return;
    }
    try {
      const bitmap = await fileToBitmap(file);
      logoRef.current?.bitmap.close();
      const asset = { bitmap, name: file.name };
      logoRef.current = asset;
      setLogo(asset);
      setLogoError(null);
    } catch (err) {
      setLogoError(err instanceof Error ? err.message : "Couldn’t read this image");
    }
  }, []);

  const clearLogo = useCallback(() => {
    logoRef.current?.bitmap.close();
    logoRef.current = null;
    setLogo(null);
    setLogoError(null);
  }, []);

  const filename = `${sanitizeStem(stem)}.png`;
  const svgName = `${sanitizeStem(stem)}.svg`;
  const ready = !empty && !!preview && !encodeError;

  const handlePng = useCallback(async () => {
    if (!preview) return;
    const blob = await canvasToPngBlob(preview);
    downloadBlob(blob, filename);
    setDownloaded(true);
  }, [preview, filename]);

  const handleSvg = useCallback(async () => {
    if (empty || logo) return;
    try {
      const svg = await encodeToSvg(payload, { ecc: effectiveEcc, size, margin, fg, bg });
      const blob = new Blob([svg], { type: "image/svg+xml" });
      downloadBlob(blob, svgName);
      setDownloaded(true);
    } catch (err) {
      setEncodeError(humanEncodeError(err));
    }
  }, [empty, logo, payload, effectiveEcc, size, margin, fg, bg, svgName]);

  const handleCopy = useCallback(async () => {
    if (!preview) return;
    const blob = await canvasToPngBlob(preview);
    const ok = await copyPng(blob);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
      setDownloaded(true);
    } else {
      downloadBlob(blob, filename);
      setDownloaded(true);
    }
  }, [preview, filename]);

  const handleShare = useCallback(async () => {
    if (!preview) return;
    const blob = await canvasToPngBlob(preview);
    await shareOrDownload(blob, filename, "Mark QR");
    setDownloaded(true);
  }, [preview, filename]);

  const barProps = {
    disabled: !ready,
    svgDisabled: !!logo,
    onPng: () => void handlePng(),
    onSvg: () => void handleSvg(),
    onCopy: () => void handleCopy(),
    onShare: () => void handleShare(),
    canShare,
    copied,
    stem,
    onStem: setStem,
  };

  return (
    <div className="pb-36 lg:pb-0">
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Private QR generator</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">QR codes in the browser — private, custom, no signup</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          URL, WiFi, vCard, colors and logo. Drawn on this device. No watermark, no daily limit, nothing uploaded.
        </p>
      </header>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="grid gap-5 rounded-card border border-border bg-surface p-4 shadow-card sm:p-5">
          <TypeSwitcher value={type} onChange={setType} />
          <PayloadForm
            type={type}
            url={url}
            onUrl={setUrl}
            text={text}
            onText={setText}
            wifi={wifi}
            onWifi={setWifi}
            vcard={vcard}
            onVcard={setVcard}
            email={email}
            onEmail={setEmail}
            phone={phone}
            onPhone={setPhone}
            sms={sms}
            onSms={setSms}
          />
          <StyleControls
            ecc={effectiveEcc}
            onEcc={setEcc}
            eccLocked={eccLocked}
            size={size}
            onSize={setSize}
            margin={margin}
            onMargin={setMargin}
            fg={fg}
            onFg={setFg}
            bg={bg}
            onBg={setBg}
          />
          <LogoDrop name={logo?.name ?? null} error={logoError} onFile={(file) => void onLogoFile(file)} onClear={clearLogo} />
          <div className="hidden lg:block">
            <DownloadBar {...barProps} />
          </div>
          {downloaded ? (
            <div className="hidden space-y-3 lg:block">
              <p className="text-sm text-ink">Saved. Test the code with your camera before you print it.</p>
              <AdUnit slot="after-success" />
              <SoftAgencyCta variant="after-success" />
            </div>
          ) : null}
        </div>

        <div className="grid gap-3 lg:sticky lg:top-4">
          <QrPreview canvas={preview} payload={payload} empty={empty} bg={bg} bytes={bytes} error={encodeError} />
          <ContrastWarn show={lowContrast && !empty} ratio={ratio} />
        </div>
      </div>

      <DownloadBar {...barProps} sticky />
      {downloaded ? (
        <div className="mt-6 space-y-3 lg:hidden">
          <AdUnit slot="after-success" />
        </div>
      ) : null}
    </div>
  );
}
