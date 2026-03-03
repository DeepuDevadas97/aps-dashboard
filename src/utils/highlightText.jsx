export function renderHighlightedLine(text, highlights) {
  if (!highlights.length) {
    return text;
  }

  const escaped = highlights
    .filter(Boolean)
    .map((fragment) => fragment.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'));

  if (!escaped.length) {
    return text;
  }

  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  return text.split(pattern).map((part, index) => {
    const isMatch = highlights.some((fragment) => fragment.toLowerCase() === part.toLowerCase());
    return isMatch ? (
      <mark key={`${part}-${index}`} className="log-highlight">
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    );
  });
}
