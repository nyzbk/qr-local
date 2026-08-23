import type { EmailFields, PhoneFields, SmsFields, VcardFields, WifiFields } from "./types";

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const LOOKS_LIKE_HOST = /^(localhost(:\d+)?([/?#]|$)|(\d{1,3}\.){3}\d{1,3}(:\d+)?([/?#]|$)|[\w-]+(\.[\w-]+)+)/i;

export function urlNormalize(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (HAS_SCHEME.test(t)) return t;
  if (LOOKS_LIKE_HOST.test(t)) {
    if (/^(localhost|127\.|0\.0\.0\.0|10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/i.test(t)) {
      return `http://${t}`;
    }
    return `https://${t}`;
  }
  return t;
}

export function wifiEscape(value: string): string {
  return value.replace(/([\\;,:])/g, "\\$1");
}

export function wifiPayload({ ssid, password, security, hidden }: WifiFields): string {
  const s = ssid.trim();
  if (!s) return "";
  const t = security === "nopass" ? "nopass" : security;
  const p = t === "nopass" ? "" : password;
  const h = hidden ? "H:true;" : "";
  return `WIFI:T:${t};S:${wifiEscape(s)};P:${wifiEscape(p)};${h};`;
}

function foldLine(line: string): string {
  if (line.length <= 75) return line;
  const chunks: string[] = [line.slice(0, 75)];
  let rest = line.slice(75);
  while (rest.length) {
    chunks.push(` ${rest.slice(0, 74)}`);
    rest = rest.slice(74);
  }
  return chunks.join("\r\n");
}

function vcardEscape(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function vcardPayload(fields: VcardFields): string {
  const first = fields.first.trim();
  const last = fields.last.trim();
  const org = fields.org.trim();
  const title = fields.title.trim();
  const phone = fields.phone.trim();
  const email = fields.email.trim();
  const url = fields.url.trim();
  const fn = `${first} ${last}`.trim() || org || email || phone;
  if (!fn) return "";

  const lines = ["BEGIN:VCARD", "VERSION:3.0", `N:${vcardEscape(last)};${vcardEscape(first)};;;`, `FN:${vcardEscape(fn)}`];
  if (org) lines.push(`ORG:${vcardEscape(org)}`);
  if (title) lines.push(`TITLE:${vcardEscape(title)}`);
  if (phone) lines.push(`TEL:${vcardEscape(phone)}`);
  if (email) lines.push(`EMAIL:${vcardEscape(email)}`);
  if (url) lines.push(`URL:${urlNormalize(url)}`);
  lines.push("END:VCARD");
  return lines.map(foldLine).join("\r\n");
}

export function mailtoPayload({ address, subject, body }: EmailFields): string {
  const addr = address.trim();
  if (!addr) return "";
  const params = new URLSearchParams();
  if (subject.trim()) params.set("subject", subject.trim());
  if (body.trim()) params.set("body", body.trim());
  const query = params.toString();
  return query ? `mailto:${addr}?${query}` : `mailto:${addr}`;
}

export function telPayload({ number }: PhoneFields): string {
  const n = number.trim();
  if (!n) return "";
  return `tel:${n.replace(/[\s().-]/g, "")}`;
}

export function smstoPayload({ number, message }: SmsFields): string {
  const n = number.trim();
  if (!n) return "";
  const body = message.replace(/\r?\n/g, " ");
  return `SMSTO:${n.replace(/[\s().-]/g, "")}:${body}`;
}

export function payloadBytes(payload: string): number {
  return new TextEncoder().encode(payload).length;
}
