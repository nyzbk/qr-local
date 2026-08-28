import { createFileRoute, Link } from "@tanstack/react-router";
import { Article, Related } from "@/components/Article";
import { SiteShell } from "@/components/SiteShell";
import { AGENCY_NAME, AGENCY_URL, CONTACT_EMAIL, CONTENT_UPDATED, OPERATOR_NAME } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "/about",
      "About Mark — a private QR generator in the browser",
      "Mark draws static QR codes in your tab: URL, WiFi, vCard. No account, no watermark, no scan dashboard. Operated by Ultimatum.",
    ),
  component: AboutPage,
});

function AboutPage() {
  const url = import.meta.env.VITE_AGENCY_URL || AGENCY_URL;
  const name = import.meta.env.VITE_AGENCY_NAME || AGENCY_NAME;

  return (
    <SiteShell>
      <Article
        title="About Mark"
        updated={CONTENT_UPDATED}
        lede="Mark exists because a QR payload is often a secret or a personal identifier, and the typical free generator is an upload form with a watermark."
      >
        <h2>Local-first, for this job only</h2>
        <p>
          Encoding a URL looks harmless until the URL is a staging site, a WiFi PSK, or a phone number. Sending
          that string to a SaaS so they can draw black squares is a bad trade. Mark keeps the trade on your
          device: JavaScript encoder, Canvas, a file download. No account. No watermark. No daily credits.
        </p>
        <h2>What this site does</h2>
        <p>
          It draws static QR codes for URL, text, WiFi, vCard, email, phone and SMS. You can set colours, size,
          quiet zone and an optional centred logo with high error correction. Output is PNG, plus SVG when there
          is no logo. The preview is live. Empty input does not download a fake code.
        </p>
        <p>
          It does not shorten links. It does not count scans. It does not let you edit a printed code later. It
          does not scan other people’s codes with the camera. Those are different products, and they need a
          server or a device API we are not wrapping here.
        </p>
        <p>
          It will not stop you encoding a malicious URL. A QR code is not a character reference. If you print a
          trap, that is on you. We say this on the homepage because “custom QR” sites often skip it.
        </p>
        <h2>What we refuse to build into this free tool</h2>
        <p>
          Accounts, cloud history, “unlock SVG with email,” scan analytics, and a watermark we later sell you
          the removal of. Also not a watermark-removal product — that is a policy problem of its own. Mark is
          one utility with a stamp-like interface, not a suite of twelve identical landing pages glued together
          in this repository.
        </p>
        <p>
          The interface is a generator first, then guides: how to encode, guest WiFi, print, events,
          troubleshooting, FAQ. Those pages exist so a reviewer (and a person) can read what the tool does in
          full sentences, not only stare at a dropzone. They are written for QR payloads, not copied from an
          image compressor.
        </p>
        <h2>Who operates it</h2>
        <p>
          {OPERATOR_NAME} operates Mark. Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. There is a{" "}
          <Link to="/contact">contact page</Link> with what to include. Custom software and paid websites are a
          separate conversation with{" "}
          <a href={url} rel="noopener noreferrer">
            {name}
          </a>
          .
        </p>
        <Related
          items={[
            { to: "/how-to", label: "How to" },
            { to: "/privacy", label: "Privacy" },
            { to: "/contact", label: "Contact" },
          ]}
        />
      </Article>
    </SiteShell>
  );
}
