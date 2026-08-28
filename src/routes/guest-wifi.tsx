import { createFileRoute, Link } from "@tanstack/react-router";
import { Article, Related } from "@/components/Article";
import { SiteShell } from "@/components/SiteShell";
import { CONTENT_UPDATED } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guest-wifi")({
  head: () =>
    pageHead(
      "/guest-wifi",
      "Guest WiFi QR for a café or studio — without uploading the password",
      "Put a guest network on a table tent: SSID, WPA password, hidden flag. Encode in the browser so the password is not posted to a QR API.",
    ),
  component: GuestWifiPage,
});

function GuestWifiPage() {
  return (
    <SiteShell>
      <Article
        title="Guest WiFi on a card, password not uploaded"
        updated={CONTENT_UPDATED}
        lede="A table tent that joins the guest network is one of the few QR jobs where the payload is a secret. Treat the generator like a notepad, not like a cloud form."
      >
        <h2>The job</h2>
        <p>
          Visitors should point a camera at a card and join “Cafe-Guest” without asking the staff to spell the
          password over the espresso machine. The card will be photographed. Anyone with the photo has the
          password. That is acceptable for a guest VLAN. It is not acceptable for the point-of-sale network.
        </p>
        <h2>Encode it here</h2>
        <p>
          Open the <Link to="/wifi">WiFi generator</Link>. SSID is the network name exactly as the access point
          broadcasts it, including spaces and capital letters. Security is almost always WPA (WPA2/WPA3 in
          practice still use the WPA type in the WIFI: string). Password is the PSK. Hidden is only for networks
          that do not broadcast the SSID — most guest networks are not hidden.
        </p>
        <p>
          Mark escapes ; , : and \ inside the SSID and password so the phone parser does not split the fields.
          The payload looks like WIFI:T:WPA;S:Cafe-Guest;P:the-secret;; — you can confirm it in a decoder after
          download. We do not send that string to a server.
        </p>
        <h2>Print size</h2>
        <p>
          A 512-pixel PNG at about 5–7 cm on the card is enough for a phone at arm’s length. Keep four modules of
          quiet zone. Do not put the code on a window in direct sun behind half-silvered film. Test with an
          Android camera and an iPhone; they disagree more often than marketing sites admit.
        </p>
        <h2>When the password changes</h2>
        <p>
          Static codes do not update. Reprint the tent. If you change the password monthly, a dynamic QR vendor
          might be cheaper than card stock — and then you are back to a server holding the secret. Choose
          deliberately.
        </p>
        <Related
          items={[
            { to: "/wifi", label: "WiFi generator" },
            { to: "/print", label: "Print notes" },
            { to: "/how-to", label: "How to" },
          ]}
        />
      </Article>
    </SiteShell>
  );
}
