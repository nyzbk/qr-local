import { createFileRoute } from "@tanstack/react-router";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Related } from "@/components/Article";
import { SiteShell } from "@/components/SiteShell";
import { CONTENT_UPDATED } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead(
      "/faq",
      "QR generator FAQ — privacy, logo, WiFi, iPhone — Mark",
      "Answers about in-browser QR encoding: uploads, accounts, watermarks, SVG vs PNG, guest WiFi, iOS Safari, ads, and who operates Mark.",
    ),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteShell>
      <JsonLd />
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">FAQ</h1>
        <p className="mt-2 font-mono text-xs text-muted">Last updated: {CONTENT_UPDATED}</p>
        <p className="mt-6 text-base leading-relaxed">
          These answers are about Mark specifically — a static QR generator that runs in the browser. They are
          not a generic “file converter” FAQ. If a scanner still fails after this list, read troubleshooting.
        </p>
        <Faq />
        <Related
          items={[
            { to: "/how-to", label: "How to" },
            { to: "/troubleshooting", label: "Troubleshooting" },
            { to: "/contact", label: "Contact" },
          ]}
        />
      </article>
    </SiteShell>
  );
}
