import { createFileRoute, Link } from "@tanstack/react-router";
import { Article, Related } from "@/components/Article";
import { SiteShell } from "@/components/SiteShell";
import { CONTENT_UPDATED } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/troubleshooting")({
  head: () =>
    pageHead(
      "/troubleshooting",
      "QR code will not scan — contrast, logo, iPhone download — Mark",
      "Fix unscannable QR codes: low contrast, logo over finder patterns, cropped quiet zone, QR capacity, and iOS download quirks.",
    ),
  component: TroubleshootingPage,
});

function TroubleshootingPage() {
  return (
    <SiteShell>
      <Article
        title="When the code will not scan"
        updated={CONTENT_UPDATED}
        lede="The preview can look fine on a monitor and still fail in a camera. Walk this list before you reprint a hundred stickers."
      >
        <h2>Low contrast</h2>
        <p>
          Cameras want dark modules on a light field. Mark warns when relative luminance contrast is under about
          4.5:1. The download is not blocked — you might be printing on kraft stock where a brown field is
          deliberate — but a yellow mark on white will fail more often than it succeeds. Keep foreground near
          #111111 and background near #FFFFFF unless you have tested the pair on a physical print.
        </p>
        <h2>Logo sitting on a finder</h2>
        <p>
          The three 7×7 squares in the corners are how the camera finds the code. Mark keeps the logo in the
          centre and caps it at roughly 18% of the square, with a pad the colour of the background. If you export
          elsewhere and paste a huge mark on top, you can cover a finder. Stay in this tool or keep the same
          geometry. Error correction H is required with a logo; we force it.
        </p>
        <h2>Quiet zone cropped</h2>
        <p>
          Printers and social-network image crops eat margins. A quiet zone of 4 modules is the default. If the
          shop trims to the black squares, raise the margin to 8 before you send the file. Do not put text or a
          brand bar flush against the modules.
        </p>
        <h2>Capacity and speckle</h2>
        <p>
          A long URL with tracking parameters, a vCard with five addresses, or a pasted essay will either fail
          with a capacity message or produce a dense matrix that only scans at large print sizes. Shorten the
          payload. Prefer a short https link over a data URL.
        </p>
        <h2>iPhone download</h2>
        <p>
          Safari often ignores the HTML download attribute. Use Share and Save Image, or open the PNG in a new
          tab and hold. Copy can fail without clipboard permission; that is not a generator bug. HEIC logos from
          Camera Roll are rejected — convert to JPEG or PNG first.
        </p>
        <h2>The camera opens the wrong thing</h2>
        <p>
          WiFi codes need the WIFI: prefix, not a URL that happens to mention the SSID. vCards need BEGIN:VCARD.
          If you stayed on the URL type and typed a password, you encoded a URL (or text), not a network. Switch
          type on the <Link to="/wifi">WiFi page</Link> or the <Link to="/vcard">vCard page</Link>.
        </p>
        <Related
          items={[
            { to: "/how-to", label: "How to" },
            { to: "/faq", label: "FAQ" },
            { to: "/", label: "Generator" },
          ]}
        />
      </Article>
    </SiteShell>
  );
}
