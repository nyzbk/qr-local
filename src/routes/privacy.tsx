import { createFileRoute, Link } from "@tanstack/react-router";
import { Article, Related } from "@/components/Article";
import { SiteShell } from "@/components/SiteShell";
import { CONTACT_EMAIL, CONTENT_UPDATED, OPERATOR_NAME } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead(
      "/privacy",
      "Privacy Policy — Mark QR generator",
      "Mark encodes QR payloads in your browser. URLs, WiFi passwords, vCards and logos are not uploaded. AdSense may collect anonymised usage, not the payload.",
    ),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <Article title="Privacy Policy" updated={CONTENT_UPDATED}>
        <p>
          Mark generates QR codes entirely in your web browser. We do not upload, store or transmit the content
          of your URLs, WiFi credentials, vCards, messages or logo images to any server for encoding.
        </p>
        <ul>
          <li>No accounts or registration.</li>
          <li>Payload processing is in memory in this tab (qrcode + Canvas).</li>
          <li>We do not call third-party QR HTTP APIs with your string.</li>
          <li>
            Google AdSense may collect anonymised usage after you interact with the site. That does not include
            the text or images you encode.
          </li>
          <li>Hosting and CDN providers may log IP addresses, user-agent strings and request paths.</li>
        </ul>
        <p>
          Closing the tab drops the in-memory payload. Files you download remain on your device under your
          control. We cannot “delete your QR” from our servers because we did not store it.
        </p>
        <p>
          Operator: {OPERATOR_NAME}. Questions:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or the <Link to="/contact">contact</Link> page.
          Do not email secrets; mail is not the encoder.
        </p>
        <Related items={[{ to: "/terms", label: "Terms" }, { to: "/about", label: "About" }]} />
      </Article>
    </SiteShell>
  );
}
