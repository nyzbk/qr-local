import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/JsonLd";
import { MarkApp } from "@/components/MarkApp";
import { Related } from "@/components/Article";
import { SiteShell } from "@/components/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/wifi")({
  head: () =>
    pageHead(
      "/wifi",
      "WiFi QR Code Generator — SSID, WPA, hidden — Mark",
      "Build a WIFI:T:S:P: QR in the browser. Escapes special characters. Password is not uploaded. For guest networks, not staff VLANs.",
    ),
  component: WifiPage,
});

function WifiPage() {
  return (
    <SiteShell>
      <JsonLd />
      <MarkApp initialType="wifi" />
      <section className="prose-mark mx-auto mt-14 max-w-2xl">
        <h2>What this page encodes</h2>
        <p>
          This is not a generic URL generator with the word WiFi in the title. The payload is the MECARD-like
          WIFI: string that iOS and Android cameras understand. Type, SSID, password and the hidden flag map onto
          T, S, P and H. Empty password is valid only for nopass networks; WPA with a blank P will not join.
        </p>
        <p>
          Special characters in the SSID or password are escaped: semicolon, comma, colon and backslash. If you
          skip that step in a homemade string, a network named “Shop;2F” becomes two fields. Mark does the
          escaping in this tab.
        </p>
        <h2>Guest versus staff</h2>
        <p>
          Put guest credentials on a tent. Do not put the office SSID on the street window. A photograph of the
          code is the password. There is a longer write-up for cafés and studios on{" "}
          <Link to="/guest-wifi">guest WiFi</Link>.
        </p>
        <p>
          After download, scan with a phone that is not already joined to the network. If the sheet says “open”
          but you picked WPA, the phone will wait for a key that does not exist.
        </p>
        <Related
          items={[
            { to: "/guest-wifi", label: "Guest WiFi guide" },
            { to: "/how-to", label: "How to" },
            { to: "/troubleshooting", label: "Troubleshooting" },
          ]}
        />
      </section>
    </SiteShell>
  );
}
