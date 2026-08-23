import { createFileRoute } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { Faq } from "@/components/Faq";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { MarkApp } from "@/components/MarkApp";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/wifi")({
  head: () => ({
    meta: [
      { title: "WiFi QR Code Generator — Mark" },
      {
        name: "description",
        content: "Create a guest WiFi QR code in your browser. SSID, password, WPA. Nothing uploaded.",
      },
    ],
  }),
  component: WifiPage,
});

function WifiPage() {
  return (
    <SiteShell>
      <JsonLd />
      <MarkApp initialType="wifi" />
      <HowItWorks />
      <AdUnit slot="mid" className="mt-10" />
      <Faq />
    </SiteShell>
  );
}
