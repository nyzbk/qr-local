import { createFileRoute } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { Faq } from "@/components/Faq";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { MarkApp } from "@/components/MarkApp";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/vcard")({
  head: () => ({
    meta: [
      { title: "vCard QR Code Generator — Mark" },
      {
        name: "description",
        content: "Create a contact QR (vCard) in your browser. Name, phone, email, URL. Nothing uploaded.",
      },
    ],
  }),
  component: VcardPage,
});

function VcardPage() {
  return (
    <SiteShell>
      <JsonLd />
      <MarkApp initialType="vcard" />
      <HowItWorks />
      <AdUnit slot="mid" className="mt-10" />
      <Faq />
    </SiteShell>
  );
}
