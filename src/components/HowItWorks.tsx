import { Download, Palette, QrCode } from "lucide-react";

const STEPS = [
  {
    icon: QrCode,
    title: "Choose a type",
    body: "Link, WiFi, card, or plain text. The payload never leaves this tab.",
  },
  {
    icon: Palette,
    title: "Mark it",
    body: "Colors, size, optional logo. Preview updates in the browser.",
  },
  {
    icon: Download,
    title: "Download",
    body: "PNG for logos and share sheets. SVG for clean print. Nothing was uploaded.",
  },
];

export function HowItWorks() {
  return (
    <section className="mt-14">
      <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-3">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={step.title} className="rounded-card border border-border bg-surface p-4 shadow-card">
              <p className="font-mono text-xs text-muted">0{index + 1}</p>
              <Icon className="mt-3 size-5 text-accent" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-3 text-sm font-medium">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
