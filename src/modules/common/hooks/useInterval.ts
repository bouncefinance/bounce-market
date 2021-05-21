import { useEffect, useRef } from 'react';

/**
 * The hook explanation is here:
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 *
 * If the delay is null, the interval will be paused.
 */
export function useInterval(
  callback: () => void,
  delay: number | null,
  immediately?: boolean,
) {
  const savedCallback = useRef<any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (immediately) {
      savedCallback.current();
    }

    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay, immediately]);
}
