import { useCallback, useState } from 'react';

export const useBidDialog = () => {
  const [opened, setOpened] = useState(false);

  const toggleDialog = useCallback(
    (isOpen: boolean) => () => {
      setOpened(isOpen);
    },
    [],
  );

  return { toggleDialog, opened };
};
