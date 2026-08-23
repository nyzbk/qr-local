import { PAYLOAD_TYPES } from "@/lib/constants";
import type { PayloadType } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  value: PayloadType;
  onChange: (value: PayloadType) => void;
};

export function TypeSwitcher({ value, onChange }: Props) {
  return (
    <div
      role="radiogroup"
      aria-label="QR payload type"
      className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:rounded-card sm:border sm:border-border sm:bg-bg sm:p-1 sm:px-1"
    >
      {PAYLOAD_TYPES.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            data-type={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-11 shrink-0 rounded-control px-3.5 text-sm font-medium transition-colors duration-150",
              active ? "bg-ink text-surface shadow-sm" : "bg-surface text-muted hover:text-ink sm:bg-transparent",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
