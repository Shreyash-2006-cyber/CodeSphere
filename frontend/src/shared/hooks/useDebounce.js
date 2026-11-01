import { useEffect, useState } from "react";

// Debounces a fast-changing value (e.g. search input) before it
// triggers filtering/fetching.
export function useDebounce(value, delayMs = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
