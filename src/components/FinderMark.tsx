import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
};

export function FinderMark({ className, size = 32 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <rect width="32" height="32" rx="6" fill="#0C0C0C" />
      <rect x="4" y="4" width="24" height="24" fill="#F3F1EB" />
      <rect x="8" y="8" width="16" height="16" fill="#0C0C0C" />
      <rect x="11" y="11" width="10" height="10" fill="#F3F1EB" />
      <rect x="14" y="14" width="4" height="4" fill="#4F46E5" />
    </svg>
  );
}

function Corner({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="7" height="7" fill="currentColor" />
      <rect x="1" y="1" width="5" height="5" fill="#F3F1EB" />
      <rect x="2" y="2" width="3" height="3" fill="currentColor" />
    </g>
  );
}

export function FinderPlaceholder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 21 21" className={cn("text-muted/50", className)} aria-hidden="true">
      <Corner x={0} y={0} />
      <Corner x={14} y={0} />
      <Corner x={0} y={14} />
    </svg>
  );
}
