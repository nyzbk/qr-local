import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/JsonLd";
import { MarkApp } from "@/components/MarkApp";
import { Related } from "@/components/Article";
import { SiteShell } from "@/components/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/vcard")({
  head: () =>
    pageHead(
      "/vcard",
      "vCard QR Code Generator — name, phone, email — Mark",
      "Encode a vCard 3.0 in the browser for badges and handouts. Fields stay in this tab. Keep the card short so the matrix still scans.",
    ),
  component: VcardPage,
});

function VcardPage() {
  return (
    <SiteShell>
      <JsonLd />
      <MarkApp initialType="vcard" />
      <section className="prose-mark mx-auto mt-14 max-w-2xl">
        <h2>What a contact QR actually is</h2>
        <p>
          The camera is not “adding a friend in Mark.” It is reading a vCard 3.0 block: BEGIN:VCARD, name, org,
          title, tel, email, URL, END:VCARD. Long lines are folded so the payload stays valid. Mark builds that
          block in the browser. We do not keep an address book.
        </p>
        <p>
          Fill only what you want a stranger with a camera to have. A badge at a booth is public. A private
          mobile number on a poster in a corridor is public too, whether you meant it or not. Ask before you
          print someone else’s card.
        </p>
        <h2>Keep it short</h2>
        <p>
          Five addresses, a biography and three websites will either hit capacity or produce a dense square that
          only scans at large size. Name plus one phone plus one email is enough for a handshake. Put the rest
          on the URL field as a single https link.
        </p>
        <p>
          For talks and check-in, see <Link to="/events">events</Link>. For print size and stock, see{" "}
          <Link to="/print">print</Link>.
        </p>
        <Related
          items={[
            { to: "/events", label: "Events" },
            { to: "/how-to", label: "How to" },
            { to: "/faq", label: "FAQ" },
          ]}
        />
      </section>
    </SiteShell>
  );
}
