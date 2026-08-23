import { ImagePlus, X } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  name: string | null;
  error: string | null;
  onFile: (file: File) => void;
  onClear: () => void;
};

export function LogoDrop({ name, error, onFile, onClear }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) onFile(file);
  }

  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted">Logo (optional)</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="sr-only"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
        data-testid="logo-input"
      />
      {name ? (
        <div className="flex min-h-11 items-center justify-between gap-3 rounded-card border border-border bg-surface px-3">
          <p className="truncate text-sm">{name}</p>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted hover:text-ink"
            aria-label="Remove logo"
          >
            <X className="size-4" strokeWidth={2} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex min-h-16 w-full items-center justify-center gap-2 rounded-card border border-dashed border-border bg-surface px-4 text-sm text-muted hover:text-ink",
          )}
        >
          <ImagePlus className="size-4" strokeWidth={1.75} aria-hidden="true" />
          Drop a PNG, JPG, WebP or SVG — max 18% of the mark
        </button>
      )}
      {error ? (
        <p role="alert" className="mt-2 text-sm text-danger" data-testid="logo-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
