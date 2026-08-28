import { createFileRoute, Link } from "@tanstack/react-router";
import { Article, Related } from "@/components/Article";
import { SiteShell } from "@/components/SiteShell";
import { CONTENT_UPDATED } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/print")({
  head: () =>
    pageHead(
      "/print",
      "Print a QR code for packaging, menus and posters — Mark",
      "SVG vs PNG for print, quiet zone, minimum size, contrast on kraft and coloured stock, and why you should scan a proof.",
    ),
  component: PrintPage,
});

function PrintPage() {
  return (
    <SiteShell>
      <Article
        title="Printing a QR code that still scans"
        updated={CONTENT_UPDATED}
        lede="A menu, a shipping label and a shop-window poster fail in different ways. The matrix is the same; the paper and the distance are not."
      >
        <h2>File type</h2>
        <p>
          For a code without a logo, download SVG from the <Link to="/">generator</Link> and place it in the
          layout at the size you will print. Vectors keep module edges sharp at A2. With a logo, use PNG at 1024
          pixels and do not upscale it further in the layout program — generate 1024 in Mark instead.
        </p>
        <h2>Physical size</h2>
        <p>
          A rule of thumb: about 2 cm minimum for a short URL at arm’s length, 3–4 cm if you added a logo or
          used a denser payload, larger still for a poster across a room. Distance roughly scales the side
          length. If people will scan from a metre away, do not use a 2 cm mark.
        </p>
        <h2>Stock and ink</h2>
        <p>
          Uncoated kraft swallows contrast. Print darker modules or put a white patch behind the code. Metallic
          ink and heavy gloss lamination specular-highlight the modules; matte is kinder. Never reverse a QR
          (light modules on a dark field) unless you have tested that exact camera. Mark’s warning is about
          screen contrast; paper is another variable.
        </p>
        <h2>Quiet zone in the trim</h2>
        <p>
          Leave a blank collar. If the die-cut kisses the finders, the camera has nothing to lock onto. Set
          margin to 8 modules if the printer is aggressive. Do not set type or a colour block inside that collar.
        </p>
        <h2>Proof</h2>
        <p>
          Print one copy. Scan with a phone that is not yours, outdoors and under the restaurant’s warm LEDs.
          If it fails, change contrast or size before the run. A code that only works on your laptop preview is
          not finished.
        </p>
        <Related
          items={[
            { to: "/", label: "Generator" },
            { to: "/events", label: "Events" },
            { to: "/troubleshooting", label: "Troubleshooting" },
          ]}
        />
      </Article>
    </SiteShell>
  );
}
