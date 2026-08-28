import { createFileRoute } from "@tanstack/react-router";
import { Article, Related } from "@/components/Article";
import { SiteShell } from "@/components/SiteShell";
import { CONTACT_EMAIL, CONTENT_UPDATED, OPERATOR_NAME } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "/contact",
      "Contact Mark — QR generator support",
      `Email ${OPERATOR_NAME} about the Mark QR generator. Include the page URL and browser. Do not send WiFi passwords or vCards.`,
    ),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <Article
        title="Contact"
        updated={CONTENT_UPDATED}
        lede="Mark is a small utility. There is no ticket portal and no upload form, on purpose — a form that accepted your QR payload would break the privacy promise."
      >
        <p>
          Operator: <strong>{OPERATOR_NAME}</strong>
        </p>
        <p>
          Email:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium">
            {CONTACT_EMAIL}
          </a>
        </p>
        <h2>What to include</h2>
        <ul>
          <li>The page URL (for example /wifi or /how-to).</li>
          <li>Browser and OS (Safari on iOS 18, Chrome on Android, and so on).</li>
          <li>What you expected and what you saw. A screenshot of the preview helps; a password does not.</li>
        </ul>
        <h2>What not to send</h2>
        <p>
          Do not email WiFi passwords, full vCards, passport scans or logo files that contain secrets. We will
          not generate a code for you from an inbox, and mail is not a private encoder. Use the generator in the
          browser, then delete the message if you already sent one.
        </p>
        <p>
          We do not accept files for processing at this address. There is no SLA. If the message is about a
          custom product or a paid website, say that clearly — that work is separate from this free tool.
        </p>
        <Related
          items={[
            { to: "/about", label: "About" },
            { to: "/privacy", label: "Privacy" },
            { to: "/faq", label: "FAQ" },
          ]}
        />
      </Article>
    </SiteShell>
  );
}
