export default function SeverityBadge({ severity, value }) {
  return <span className={`severity-badge severity-${severity}`}>{value}</span>;
}
