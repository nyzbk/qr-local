import { createFileRoute } from "@tanstack/react-router";
import { Faq } from "@/components/Faq";
import { HomeCopy } from "@/components/HomeCopy";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { MarkApp } from "@/components/MarkApp";
import { SiteShell } from "@/components/SiteShell";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "/",
      `${APP_NAME} — Free QR Code Generator · Custom Logo · No Upload`,
      APP_DESCRIPTION,
    ),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <JsonLd />
      <MarkApp initialType="url" />
      <HowItWorks />
      <HomeCopy />
      <Faq />
    </SiteShell>
  );
}
