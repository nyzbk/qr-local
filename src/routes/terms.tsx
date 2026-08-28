import { createFileRoute, Link } from "@tanstack/react-router";
import { Article, Related } from "@/components/Article";
import { SiteShell } from "@/components/SiteShell";
import { CONTACT_EMAIL, CONTENT_UPDATED, OPERATOR_NAME } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead(
      "/terms",
      "Terms of Use — Mark QR generator",
      "Mark is provided as-is. You are responsible for the payload you encode. Test scans before print. Do not encode illegal or deceptive content.",
    ),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteShell>
      <Article title="Terms of Use" updated={CONTENT_UPDATED}>
        <p>The Mark tool is provided “as is” without warranty of any kind.</p>
        <ul>
          <li>
            Not every camera will scan every colour combination or logo overlay. Test with your phone before you
            print a batch.
          </li>
          <li>
            You are solely responsible for the payload (others’ WiFi networks, personal data in vCards,
            destination URLs, and whether that destination is lawful).
          </li>
          <li>Do not encode illegal or deceptive content. A QR code is not a licence to phish.</li>
          <li>We may update the tool at any time. Static codes you already downloaded do not change.</li>
          <li>This is not a dynamic QR, short-link or analytics service. Availability of those features is not implied.</li>
        </ul>
        <p>
          Operator: {OPERATOR_NAME}. {CONTACT_EMAIL}. See <Link to="/contact">contact</Link>. By using Mark you
          accept these terms.
        </p>
        <Related items={[{ to: "/privacy", label: "Privacy" }, { to: "/about", label: "About" }]} />
      </Article>
    </SiteShell>
  );
}
