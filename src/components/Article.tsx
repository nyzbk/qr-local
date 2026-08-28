import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function Article({
  title,
  updated,
  lede,
  children,
}: {
  title: string;
  updated?: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {updated ? <p className="mt-2 font-mono text-xs text-muted">Last updated: {updated}</p> : null}
      {lede ? <p className="mt-6 text-base leading-relaxed text-ink">{lede}</p> : null}
      <div className="prose-mark mt-6">{children}</div>
    </article>
  );
}

export function Related({ items }: { items: { to: string; label: string }[] }) {
  return (
    <nav className="mt-10 border-t border-border pt-6" aria-label="Related">
      <p className="font-mono text-xs uppercase tracking-wide text-muted">Related</p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className="inline-flex min-h-11 items-center text-accent hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
