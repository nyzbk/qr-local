import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms of Use — Mark" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Terms of Use</h1>
        <p className="mt-2 font-mono text-xs text-muted">Last updated: 23 August 2026</p>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink">
          <p>The Mark tool is provided “as is” without warranty of any kind.</p>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>
              Not every camera will scan every color combination or logo overlay. You should test the code with your
              phone before printing.
            </li>
            <li>
              You are solely responsible for the payload you encode (including others’ WiFi networks, personal data in
              vCards, and destination URLs).
            </li>
            <li>Do not use the tool to encode illegal or deceptive content.</li>
            <li>We may update the tool at any time.</li>
          </ul>
          <p className="text-muted">By using Mark you accept these terms.</p>
        </div>
      </article>
    </SiteShell>
  );
}
