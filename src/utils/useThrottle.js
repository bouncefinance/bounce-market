// Hook
import { useEffect, useMemo, useState } from 'react';

export function useThrottle(func, delay
) {
  // State and setters for debounced value
  const [busy, setBusy] = useState(false);

  const memoizedCallback = useMemo(
    () => (...args) => {
      if (busy) return;
      setBusy(true);
      func(...args);
    },
    [busy, func],
  );

  useEffect(() => {
    if (!busy) return;
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setBusy(false);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler);
    };
  }, [busy, delay]); // Only re-call effect if value or delay changes

  return memoizedCallback;
}
