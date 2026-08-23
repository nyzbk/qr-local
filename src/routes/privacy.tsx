import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy Policy — Mark" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 font-mono text-xs text-muted">Last updated: 23 August 2026</p>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink">
          <p>
            Mark generates QR codes entirely in your web browser. We do not upload, store, or transmit the content of
            your URLs, WiFi credentials, vCards, messages, or logo images to any server.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>No accounts or registration required.</li>
            <li>Your payload never leaves this device for processing.</li>
            <li>Encoding uses only client-side libraries (qrcode + Canvas).</li>
            <li>
              Standard web analytics and advertising (Google AdSense) may collect anonymized usage data after you
              interact with the site. This does not include the text or images you encode.
            </li>
            <li>WiFi passwords and vCard fields are not sent to us.</li>
          </ul>
          <p className="text-muted">
            Hosting and CDN providers may log IP addresses, user-agent strings and request paths for security and
            reliability. They do not receive the content of codes you generate.
          </p>
        </div>
      </article>
    </SiteShell>
  );
}
