import { useEffect, useState } from "react";

// Persists a piece of state to localStorage, used for things like
// theme preference or sidebar-collapsed state until a real backend exists.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors (e.g. private browsing)
    }
  }, [key, value]);

  return [value, setValue];
}
