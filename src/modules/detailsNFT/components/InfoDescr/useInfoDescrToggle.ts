import { useCallback, useState } from 'react';

export const useInfoDescrToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);

  const toggleExpanded = useCallback(
    (isExpanded: boolean) => () => setExpanded(isExpanded),
    [],
  );

  const onTruncate = useCallback(
    (isTruncated: boolean) => {
      if (truncated !== isTruncated) {
        setTruncated(isTruncated);
      }
    },
    [truncated],
  );

  return { toggleExpanded, onTruncate, expanded, truncated };
};
