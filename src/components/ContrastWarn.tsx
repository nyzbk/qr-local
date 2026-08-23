type Props = {
  show: boolean;
  ratio: number | null;
};

export function ContrastWarn({ show, ratio }: Props) {
  if (!show) return null;
  const label = ratio != null ? ` (${ratio.toFixed(1)}:1)` : "";
  return (
    <p role="status" className="text-sm text-warn" data-testid="contrast-warning">
      Low contrast{label} — some cameras may fail to scan.
    </p>
  );
}
