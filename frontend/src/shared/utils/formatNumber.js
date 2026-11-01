// Compact number formatting, e.g. 12400 -> "12.4k"
export function formatCompactNumber(value) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(
    value
  );
}

export function formatPercent(value, digits = 0) {
  return `${Number(value).toFixed(digits)}%`;
}
