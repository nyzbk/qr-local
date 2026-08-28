import { Link } from "@tanstack/react-router";

export function HomeCopy() {
  return (
    <section className="prose-mark mx-auto mt-14 max-w-2xl" aria-labelledby="about-mark-heading">
      <h2 id="about-mark-heading">A QR generator that does not take your payload</h2>
      <p>
        Most “free QR” pages send the URL, the WiFi password or the vCard to a server, stamp a logo on the
        result, and ask for an account if you want the watermark gone. Mark does the opposite job: it draws a
        static QR code in this tab. The string you type is encoded with the <code>qrcode</code> library and
        Canvas. Nothing in that string is posted to a QR API.
      </p>
      <p>
        Use it when the payload itself is the thing you do not want to hand to a stranger’s backend — a guest
        network password on a café counter, a personal phone number on a conference badge, a private link that
        should not sit in someone else’s log. The code you download is a PNG or an SVG file on your device. It
        does not phone home when someone scans it. There is no scan counter, because that would require a
        redirect we do not run.
      </p>
      <h2>What you can encode</h2>
      <p>
        The switcher at the top of the page covers seven payload types. URL is the default: if you omit the
        scheme and the text looks like a host, Mark prefixes https://. Plain text is encoded as-is. WiFi follows
        the common WIFI:T:S:P:: convention, with escapes for semicolon, comma, colon and backslash so an SSID
        like “Cafe;Main” does not break the parser. vCard 3.0 carries name, organisation, title, phone, email
        and a site. Email, phone and SMS use mailto:, tel: and SMSTO: so the camera can open the right app.
      </p>
      <p>
        You pick error correction (L, M, Q, H), pixel size 256 / 512 / 1024, and a quiet zone of 2, 4 or 8
        modules. Foreground and background colors default to near-black on white. If the contrast drops below
        roughly 4.5:1, a warning appears. A logo is optional; when you add one, error correction is forced to H
        and the mark stays in the centre so the three finder patterns remain readable. SVG download is disabled
        while a logo is on — a logo is not a vector of modules.
      </p>
      <h2>Scan before you print, and do not encode traps</h2>
      <p>
        A QR code is just a pointer. If the pointer is a phishing URL, a network you do not control, or someone
        else’s vCard, the scanner will still open it. Mark does not inspect destination pages and does not
        refuse a URL because it looks hostile. That is your responsibility. Test every code with the same kind
        of phone you expect visitors to use, in the lighting you expect, at the size you will print. A 256-pixel
        PNG on a glossy poster across a room is a different problem from a 1024-pixel SVG on a table tent.
      </p>
      <p>
        Dynamic QR products replace the payload with a short URL they own, then count scans. That is a useful
        product for campaigns. It is also an upload plus a dependency: if that vendor disappears, the printed
        sticker dies. Mark’s codes are static. Reprint if the link changes. There is no dashboard.
      </p>
      <h2>What happens to the data</h2>
      <p>
        Payload strings and logo bytes live in memory for the session. Closing the tab drops them. We do not
        keep an account, a history or a cloud folder of your codes. Google AdSense may collect ordinary
        anonymised usage after you interact with the site; that is not the WiFi password and not the vCard.
        Hosting access logs can see IP and path. They cannot see the Canvas.
      </p>
      <p>
        iOS Safari, current Chrome and Firefox are the browsers we care about. HEIC logos are rejected with a
        pointer to convert first. There is no daily quota. If a payload is too long for any QR version, you get
        a sentence, not a white screen. Guides:{" "}
        <Link to="/how-to">how to generate a code</Link>, <Link to="/guest-wifi">guest WiFi</Link>,{" "}
        <Link to="/print">print and packaging</Link>, <Link to="/events">events</Link>,{" "}
        <Link to="/troubleshooting">troubleshooting scans</Link>.
      </p>
    </section>
  );
}
