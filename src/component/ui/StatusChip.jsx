export default function StatusChip({ value }) {
  return <span className={`status-chip status-${value.toLowerCase()}`}>{value}</span>;
}
