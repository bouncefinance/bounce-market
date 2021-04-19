import { useEffect, useRef } from 'react';

export function useInterval(
  callback: () => void,
  delay?: number,
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
    if (delay) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay, immediately]);
}
