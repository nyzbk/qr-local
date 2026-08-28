import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { FinderMark } from "./FinderMark";
import { SoftAgencyCta } from "./SoftAgencyCta";
import { APP_NAME } from "@/lib/constants";

const FOOTER = [
  { to: "/", label: "Generator" },
  { to: "/how-to", label: "How to" },
  { to: "/wifi", label: "WiFi QR" },
  { to: "/vcard", label: "vCard QR" },
  { to: "/guest-wifi", label: "Guest WiFi" },
  { to: "/print", label: "Print" },
  { to: "/events", label: "Events" },
  { to: "/faq", label: "FAQ" },
  { to: "/troubleshooting", label: "Troubleshooting" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className="border-b border-border bg-surface/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/" className="flex min-h-11 items-center gap-2 font-semibold tracking-tight">
            <FinderMark size={28} />
            {APP_NAME}
          </Link>
          <nav className="flex items-center gap-0.5 overflow-x-auto text-sm" aria-label="Primary">
            <Link to="/how-to" className="flex min-h-11 shrink-0 items-center px-2.5 text-muted hover:text-ink">
              How to
            </Link>
            <Link to="/wifi" className="hidden min-h-11 shrink-0 items-center px-2.5 text-muted hover:text-ink sm:flex">
              WiFi
            </Link>
            <Link to="/faq" className="flex min-h-11 shrink-0 items-center px-2.5 text-muted hover:text-ink">
              FAQ
            </Link>
            <Link to="/contact" className="flex min-h-11 shrink-0 items-center px-2.5 text-muted hover:text-ink">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-10">
        {children}
      </main>
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
          <SoftAgencyCta />
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted" aria-label="Footer">
            {FOOTER.map((item) => (
              <Link key={item.to} to={item.to} className="inline-flex min-h-11 items-center hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="font-mono text-xs text-muted">Payload stays in this tab · {APP_NAME} · qr-local.vercel.app</p>
        </div>
      </footer>
    </div>
  );
}
