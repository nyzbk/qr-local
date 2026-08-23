import { useEffect, useRef } from "react";
import { FinderPlaceholder } from "./FinderMark";

type Props = {
  canvas: HTMLCanvasElement | null;
  payload: string;
  empty: boolean;
  bg: string;
  bytes: number;
  error: string | null;
};

export function QrPreview({ canvas, payload, empty, bg, bytes, error }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dest = canvasRef.current;
    if (!dest || !canvas) return;
    dest.width = canvas.width;
    dest.height = canvas.height;
    const ctx = dest.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(canvas, 0, 0);
    dest.dataset.payload = payload;
  }, [canvas, payload]);

  const showCanvas = !empty && !!canvas && !error;

  return (
    <div className="rounded-card border border-border bg-surface p-4 shadow-card">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">Preview</p>
      <div
        className="mt-3 flex aspect-square items-center justify-center rounded-control bg-well p-4 shadow-stamp"
        style={{ backgroundColor: showCanvas ? bg : undefined }}
        data-testid="qr-well"
      >
        {showCanvas ? (
          <canvas
            ref={canvasRef}
            data-testid="qr-canvas"
            data-payload={payload}
            className="max-h-[min(420px,70vw)] max-w-full"
            style={{ imageRendering: "pixelated", background: bg }}
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <FinderPlaceholder className="size-36" />
            <p className="text-xs text-muted">Enter a payload to mark it</p>
          </div>
        )}
      </div>
      <p className="mt-3 font-mono text-xs tabular-nums text-muted" data-testid="payload-bytes">
        {empty ? "0 bytes" : `${bytes} bytes`}
      </p>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-danger" data-testid="encode-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
