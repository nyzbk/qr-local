import { SITE_ORIGIN } from "./constants";

export function pageHead(path: string, title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}${path}` }],
  };
}
