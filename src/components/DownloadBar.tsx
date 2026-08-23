import { Clipboard, Download, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  disabled: boolean;
  svgDisabled: boolean;
  onPng: () => void;
  onSvg: () => void;
  onCopy: () => void;
  onShare: () => void;
  canShare: boolean;
  copied: boolean;
  stem: string;
  onStem: (value: string) => void;
  sticky?: boolean;
};

export function DownloadBar({
  disabled,
  svgDisabled,
  onPng,
  onSvg,
  onCopy,
  onShare,
  canShare,
  copied,
  stem,
  onStem,
  sticky,
}: Props) {
  return (
    <div
      className={cn(
        "border-border bg-surface",
        sticky
          ? "fixed inset-x-0 bottom-0 z-40 border-t px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden"
          : "rounded-card border p-4",
      )}
      data-testid={sticky ? "download-bar-mobile" : "download-bar"}
    >
      <label className="mb-3 block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">Filename</span>
        <input
          value={stem}
          onChange={(e) => onStem(e.target.value)}
          className="min-h-11 w-full rounded-control border border-border bg-bg px-3 font-mono text-sm"
          spellCheck={false}
        />
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          disabled={disabled}
          onClick={onPng}
          data-testid="download-png"
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-control bg-accent px-4 text-sm font-medium text-accent-ink transition-colors duration-150 hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Download className="size-4" strokeWidth={2} aria-hidden="true" />
          Download PNG
        </button>
        <button
          type="button"
          disabled={disabled || svgDisabled}
          onClick={onSvg}
          title={svgDisabled ? "SVG is vector-only; download PNG for a logo mark" : "Download SVG"}
          data-testid="download-svg"
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-control border border-border bg-surface px-4 text-sm font-medium text-ink hover:bg-bg disabled:cursor-not-allowed disabled:opacity-40"
        >
          Download SVG
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={onCopy}
          data-testid="copy-png"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-border bg-surface px-4 text-sm font-medium text-ink hover:bg-bg disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Clipboard className="size-4" strokeWidth={2} aria-hidden="true" />
          {copied ? "Copied" : "Copy"}
        </button>
        {canShare ? (
          <button
            type="button"
            disabled={disabled}
            onClick={onShare}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-border bg-surface px-4 text-sm font-medium text-ink hover:bg-bg disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Share2 className="size-4" strokeWidth={2} aria-hidden="true" />
            Share
          </button>
        ) : null}
      </div>
    </div>
  );
}
