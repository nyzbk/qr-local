import { createFileRoute, Link } from "@tanstack/react-router";
import { Article, Related } from "@/components/Article";
import { SiteShell } from "@/components/SiteShell";
import { CONTENT_UPDATED } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/how-to")({
  head: () =>
    pageHead(
      "/how-to",
      "How to make a QR code without uploading it — Mark",
      "Step-by-step: encode a URL, WiFi network or vCard in the browser, pick colors and size, test the scan, download PNG or SVG. No account.",
    ),
  component: HowToPage,
});

function HowToPage() {
  return (
    <SiteShell>
      <Article
        title="How to make a QR code without uploading the payload"
        updated={CONTENT_UPDATED}
        lede="You need a code for a link, a guest network or a contact card, and you do not want a website to store that string. Mark runs the encoder in the page you already have open."
      >
        <h2>The usual failure</h2>
        <p>
          A café owner types the WiFi password into a popular generator, downloads a PNG with a watermark, then
          pays to remove it. The password has already crossed the network. A recruiter pastes a personal mobile
          number into a vCard form on a site that “helps you design QR codes.” That number is now in someone
          else’s request log. The symptom is not a crash. The symptom is a secret sitting on a server you do not
          run.
        </p>
        <p>
          Upload generators also tend to wrap your payload in their own short link so they can count scans. The
          printed sticker then depends on that vendor. If you wanted a static code, you did not get one.
        </p>
        <h2>Why this page is different</h2>
        <p>
          Mark uses the open-source <code>qrcode</code> encoder (soldair/node-qrcode) in the browser, then draws
          modules onto a Canvas. Optional logo overlay is our own draw, not a third-party QR SaaS. There is no
          call to qrserver, goqr or Google Chart. If you watch the network panel while you type a password, you
          should not see that password in a POST body.
        </p>
        <p>
          Limits are honest. QR versions have a capacity. A 2 MB logo is too large. HEIC is not decoded here.
          Low contrast is warned, not silently shipped. SVG is offered only when there is no raster logo.
        </p>
        <h2>Steps</h2>
        <ol>
          <li>
            Open the <Link to="/">generator</Link>. Leave the type on URL for a link, or switch to WiFi, vCard,
            Email, Phone, SMS or Text.
          </li>
          <li>
            Fill the fields. For a URL, “example.com” becomes https://example.com. For WiFi, pick WPA unless the
            network is actually open. For vCard, first name plus a phone number is already useful.
          </li>
          <li>
            Watch the preview. It updates after a short debounce. An empty field disables download on purpose —
            we will not emit a scannable code of an empty string and call it a feature.
          </li>
          <li>
            Optional: set size 512 (default) or 1024 for print, margin 4 modules, colors near black on white. Drop
            a logo only if you will test the scan. Error correction becomes H automatically.
          </li>
          <li>
            Download PNG. Download SVG if there is no logo. On iPhone, use Share if the file does not appear in
            Files. Open the camera app and scan the image on the same phone before you send it to a printer.
          </li>
        </ol>
        <h2>If it does not scan</h2>
        <p>Five common causes, in the order we see them:</p>
        <ol>
          <li>Foreground too light on a light background (yellow on white is the classic miss).</li>
          <li>Logo covering a finder pattern because it was scaled past the centre island.</li>
          <li>Quiet zone cropped in print — the margin was set to 2 and the shop trimmed the paper.</li>
          <li>Payload too long, so the modules became a dense speckle at 256 pixels.</li>
          <li>Gloss lamination plus a phone held at a sharp angle; try matte stock or a larger print.</li>
        </ol>
        <p>
          There is a longer list on <Link to="/troubleshooting">troubleshooting</Link>.
        </p>
        <h2>Error correction, size and the logo</h2>
        <p>
          Error correction L recovers the least damage and packs more data. M is the default. Q and H spend
          modules on redundancy. A logo punches a hole in the centre, so H is mandatory — Mark switches it for
          you. Size 256 is for on-screen shares; 512 is the default; 1024 is for print. A 1024-pixel canvas is
          still a raster: if you need infinite scale without a logo, that is the SVG button, not a bigger PNG.
        </p>
        <p>
          iOS may refuse to “download” and still happily Share a PNG into Photos. That is enough. Do not assume
          ClipboardItem works in Safari. After the file is on the phone, open Camera and scan your own lock
          screen or a printed proof — scanning the preview in the same tab can succeed while a scaled-down
          Instagram crop later fails.
        </p>
        <h2>After you close the tab</h2>
        <p>
          The URL, password and vCard are gone from Mark’s memory. The PNG on disk is yours. Scanning it does not
          notify us. If you encoded a WiFi password, anyone who photographs the sticker can join that network —
          that is how guest QR works, and also why you should not print the staff VLAN on a window.
        </p>
        <h2>Compared with Photos, Canva and upload sites</h2>
        <p>
          Apple’s Camera can read codes; it does not give you a designer for WiFi strings. Canva and similar
          editors will make a pretty frame, then often generate the matrix through a cloud API. A dedicated
          upload generator will watermark the free tier. Mark is unpretty on purpose: modules, quiet zone, a
          stamp-like preview. If you need a campaign with editable destinations, use a dynamic vendor and accept
          the server. If you need a private static mark, stay here.
        </p>
        <Related
          items={[
            { to: "/", label: "Open the generator" },
            { to: "/wifi", label: "WiFi fields" },
            { to: "/vcard", label: "vCard fields" },
            { to: "/faq", label: "FAQ" },
          ]}
        />
      </Article>
    </SiteShell>
  );
}
