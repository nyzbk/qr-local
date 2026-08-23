import type { ReactNode } from "react";
import type { EmailFields, PayloadType, PhoneFields, SmsFields, VcardFields, WifiFields, WifiSecurity } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  type: PayloadType;
  url: string;
  onUrl: (value: string) => void;
  text: string;
  onText: (value: string) => void;
  wifi: WifiFields;
  onWifi: (value: WifiFields) => void;
  vcard: VcardFields;
  onVcard: (value: VcardFields) => void;
  email: EmailFields;
  onEmail: (value: EmailFields) => void;
  phone: PhoneFields;
  onPhone: (value: PhoneFields) => void;
  sms: SmsFields;
  onSms: (value: SmsFields) => void;
};

const fieldClass =
  "min-h-11 w-full rounded-control border border-border bg-surface px-3 text-sm text-ink placeholder:text-muted/70";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted";

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

const WIFI_TYPES: { value: WifiSecurity; label: string }[] = [
  { value: "WPA", label: "WPA/WPA2" },
  { value: "WEP", label: "WEP" },
  { value: "nopass", label: "Open" },
];

export function PayloadForm({
  type,
  url,
  onUrl,
  text,
  onText,
  wifi,
  onWifi,
  vcard,
  onVcard,
  email,
  onEmail,
  phone,
  onPhone,
  sms,
  onSms,
}: Props) {
  if (type === "url") {
    return (
      <Field label="URL" hint="Hosts without a scheme get https://">
        <input
          className={fieldClass}
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder="https://"
          value={url}
          onChange={(e) => onUrl(e.target.value)}
          autoFocus
          data-testid="payload-url"
        />
      </Field>
    );
  }

  if (type === "text") {
    return (
      <Field label="Text">
        <textarea
          className={cn(fieldClass, "min-h-28 py-2")}
          placeholder="Any string — stays in this tab"
          value={text}
          onChange={(e) => onText(e.target.value)}
          data-testid="payload-text"
        />
      </Field>
    );
  }

  if (type === "wifi") {
    return (
      <div className="grid gap-3">
        <Field label="Network name (SSID)">
          <input
            className={fieldClass}
            type="text"
            autoComplete="off"
            placeholder="Guest"
            value={wifi.ssid}
            onChange={(e) => onWifi({ ...wifi, ssid: e.target.value })}
            data-testid="wifi-ssid"
          />
        </Field>
        <div>
          <span className={labelClass}>Security</span>
          <div role="radiogroup" aria-label="WiFi security" className="flex gap-1 rounded-card border border-border bg-bg p-1">
            {WIFI_TYPES.map((option) => {
              const active = wifi.security === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onWifi({ ...wifi, security: option.value })}
                  className={cn(
                    "min-h-11 flex-1 rounded-control px-2 text-sm font-medium",
                    active ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
        {wifi.security !== "nopass" ? (
          <Field label="Password">
            <input
              className={fieldClass}
              type="text"
              autoComplete="off"
              placeholder="Password"
              value={wifi.password}
              onChange={(e) => onWifi({ ...wifi, password: e.target.value })}
              data-testid="wifi-password"
            />
          </Field>
        ) : null}
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={wifi.hidden}
            onChange={(e) => onWifi({ ...wifi, hidden: e.target.checked })}
            className="size-4 accent-accent"
          />
          Hidden network
        </label>
      </div>
    );
  }

  if (type === "vcard") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="First name">
          <input className={fieldClass} value={vcard.first} onChange={(e) => onVcard({ ...vcard, first: e.target.value })} data-testid="vcard-first" />
        </Field>
        <Field label="Last name">
          <input className={fieldClass} value={vcard.last} onChange={(e) => onVcard({ ...vcard, last: e.target.value })} />
        </Field>
        <Field label="Organization">
          <input className={fieldClass} value={vcard.org} onChange={(e) => onVcard({ ...vcard, org: e.target.value })} />
        </Field>
        <Field label="Title">
          <input className={fieldClass} value={vcard.title} onChange={(e) => onVcard({ ...vcard, title: e.target.value })} />
        </Field>
        <Field label="Phone">
          <input className={fieldClass} type="tel" inputMode="tel" value={vcard.phone} onChange={(e) => onVcard({ ...vcard, phone: e.target.value })} />
        </Field>
        <Field label="Email">
          <input className={fieldClass} type="email" inputMode="email" value={vcard.email} onChange={(e) => onVcard({ ...vcard, email: e.target.value })} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Website">
            <input className={fieldClass} type="url" inputMode="url" value={vcard.url} onChange={(e) => onVcard({ ...vcard, url: e.target.value })} />
          </Field>
        </div>
      </div>
    );
  }

  if (type === "email") {
    return (
      <div className="grid gap-3">
        <Field label="Email address">
          <input
            className={fieldClass}
            type="email"
            inputMode="email"
            placeholder="hello@example.com"
            value={email.address}
            onChange={(e) => onEmail({ ...email, address: e.target.value })}
            data-testid="email-address"
          />
        </Field>
        <Field label="Subject (optional)">
          <input className={fieldClass} value={email.subject} onChange={(e) => onEmail({ ...email, subject: e.target.value })} />
        </Field>
        <Field label="Body (optional)">
          <textarea className={cn(fieldClass, "min-h-24 py-2")} value={email.body} onChange={(e) => onEmail({ ...email, body: e.target.value })} />
        </Field>
      </div>
    );
  }

  if (type === "phone") {
    return (
      <Field label="Phone number">
        <input
          className={fieldClass}
          type="tel"
          inputMode="tel"
          placeholder="+1 555 0100"
          value={phone.number}
          onChange={(e) => onPhone({ number: e.target.value })}
          data-testid="phone-number"
        />
      </Field>
    );
  }

  return (
    <div className="grid gap-3">
      <Field label="Number">
        <input
          className={fieldClass}
          type="tel"
          inputMode="tel"
          value={sms.number}
          onChange={(e) => onSms({ ...sms, number: e.target.value })}
          data-testid="sms-number"
        />
      </Field>
      <Field label="Message">
        <textarea
          className={cn(fieldClass, "min-h-24 py-2")}
          value={sms.message}
          onChange={(e) => onSms({ ...sms, message: e.target.value })}
        />
      </Field>
    </div>
  );
}
