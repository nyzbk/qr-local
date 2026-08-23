import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { AGENCY_NAME, AGENCY_URL } from "@/lib/constants";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "About Mark" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const url = import.meta.env.VITE_AGENCY_URL || AGENCY_URL;
  const name = import.meta.env.VITE_AGENCY_NAME || AGENCY_NAME;

  return (
    <SiteShell>
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">About Mark</h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink">
          <p>
            Mark is a free, private QR code generator. Create codes for links, WiFi networks and contact cards without
            an account and without uploading anything.
          </p>
          <p>
            Codes are drawn in your browser. There is no watermark and no daily limit beyond what your device can
            render.
          </p>
          <p className="text-muted">
            Mark is part of a family of client-side utilities. Need a custom product or a $10k site?{" "}
            <a href={url} className="font-medium text-accent underline-offset-2 hover:underline" rel="noopener noreferrer">
              {name}
            </a>
            .
          </p>
        </div>
      </article>
    </SiteShell>
  );
}
