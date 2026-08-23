import { createFileRoute } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { Faq } from "@/components/Faq";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { MarkApp } from "@/components/MarkApp";
import { SiteShell } from "@/components/SiteShell";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${APP_NAME} — Free QR Code Generator · Custom Logo · No Upload` },
      { name: "description", content: APP_DESCRIPTION },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <JsonLd />
      <MarkApp initialType="url" />
      <HowItWorks />
      <AdUnit slot="mid" className="mt-10" />
      <Faq />
    </SiteShell>
  );
}
