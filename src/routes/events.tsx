import { createFileRoute, Link } from "@tanstack/react-router";
import { Article, Related } from "@/components/Article";
import { SiteShell } from "@/components/SiteShell";
import { CONTENT_UPDATED } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/events")({
  head: () =>
    pageHead(
      "/events",
      "QR codes for talks, check-in and slides — static, no scan dashboard",
      "Use Mark for event URLs, speaker vCards and feedback forms. Static codes have no scan analytics; that is the privacy tradeoff.",
    ),
  component: EventsPage,
});

function EventsPage() {
  return (
    <SiteShell>
      <Article
        title="Events: slides, badges and check-in without a tracker"
        updated={CONTENT_UPDATED}
        lede="A meetup or a small conference often needs three marks: the schedule URL, the speaker’s card, and a feedback form. None of those require a scan dashboard."
      >
        <h2>What to put in the code</h2>
        <p>
          Schedule and feedback are URLs — encode them on the <Link to="/">homepage</Link>. Prefer a short, stable
          https link you control. UTM parameters make the matrix denser and do not help you if you are not
          reading analytics anyway. Speaker contact is a <Link to="/vcard">vCard</Link>: name, title, one phone
          or email, maybe a site. Do not dump every social handle into the card if the preview already looks
          speckled.
        </p>
        <h2>Why static is a feature here</h2>
        <p>
          Organisers are often pushed toward “dynamic QR” so they can see how many people scanned the slide.
          That count is a redirect through a vendor. For a local talk, the cost is an extra failure mode: the
          vendor is down, the short link expired, the slide is a dead square. A static code printed in the PDF
          of the slides still works next year if the URL still works.
        </p>
        <p>
          If you genuinely need attendance numbers, collect them at the form the code points to, on a site you
          operate — not in the QR layer.
        </p>
        <h2>On a projector</h2>
        <p>
          Projected codes fight with keystone, brightness and people in the aisle. Make the mark large, high
          contrast, no logo, and leave it up for more than one second. A handout or a table tent is more reliable
          than the last slide of a lightning talk.
        </p>
        <h2>Badges</h2>
        <p>
          A vCard on a badge saves typing. It also publishes a phone number to anyone with a camera. Ask speakers
          before you print their mobile. Mark does not keep a copy after the tab closes; the badge is the copy.
        </p>
        <Related
          items={[
            { to: "/vcard", label: "vCard generator" },
            { to: "/print", label: "Print" },
            { to: "/how-to", label: "How to" },
          ]}
        />
      </Article>
    </SiteShell>
  );
}
