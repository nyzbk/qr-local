import { ECC_OPTIONS, MARGIN_OPTIONS, SIZE_OPTIONS } from "@/lib/constants";
import type { EccLevel, QuietZone, QrSize } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  ecc: EccLevel;
  onEcc: (value: EccLevel) => void;
  eccLocked: boolean;
  size: QrSize;
  onSize: (value: QrSize) => void;
  margin: QuietZone;
  onMargin: (value: QuietZone) => void;
  fg: string;
  onFg: (value: string) => void;
  bg: string;
  onBg: (value: string) => void;
};

function Segmented<T extends string | number>({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <div
        role="radiogroup"
        aria-label={label}
        className={cn("flex gap-1 rounded-card border border-border bg-bg p-1", disabled && "opacity-60")}
      >
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={String(option.value)}
              type="button"
              role="radio"
              aria-checked={active}
              disabled={disabled}
              onClick={() => onChange(option.value)}
              className={cn(
                "min-h-11 flex-1 rounded-control px-2 font-mono text-sm font-medium",
                active ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
  testId,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  testId: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
      <span className="flex min-h-11 items-center gap-2 rounded-control border border-border bg-surface px-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="size-8 shrink-0 cursor-pointer rounded-control border-0 bg-transparent p-0"
          data-testid={testId}
          aria-label={label}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          data-testid={`${testId}-text`}
          className="min-h-11 w-full bg-transparent font-mono text-sm uppercase outline-none"
        />
      </span>
    </label>
  );
}

export function StyleControls({
  ecc,
  onEcc,
  eccLocked,
  size,
  onSize,
  margin,
  onMargin,
  fg,
  onFg,
  bg,
  onBg,
}: Props) {
  return (
    <div className="grid gap-4">
      <Segmented label="Error correction" value={ecc} options={ECC_OPTIONS} onChange={onEcc} disabled={eccLocked} />
      {eccLocked ? (
        <p className="text-xs text-muted">High error correction is required for a logo.</p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Segmented label="Size (px)" value={size} options={SIZE_OPTIONS} onChange={onSize} />
        <Segmented label="Quiet zone" value={margin} options={MARGIN_OPTIONS} onChange={onMargin} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ColorField label="Foreground" value={fg} onChange={onFg} testId="color-fg" />
        <ColorField label="Background" value={bg} onChange={onBg} testId="color-bg" />
      </div>
    </div>
  );
}
