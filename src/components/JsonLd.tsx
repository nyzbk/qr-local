import { APP_DESCRIPTION, APP_NAME, CONTACT_EMAIL, FAQ, OPERATOR_NAME, SITE_ORIGIN } from "@/lib/constants";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: APP_NAME,
        url: SITE_ORIGIN,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: APP_DESCRIPTION,
        publisher: {
          "@type": "Organization",
          name: OPERATOR_NAME,
          email: CONTACT_EMAIL,
          url: SITE_ORIGIN,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
