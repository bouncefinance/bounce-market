import { useCallback, useState } from 'react';

export const useDialogState = () => {
  const [opened, setOpened] = useState(false);

  const open = useCallback(() => {
    setOpened(true);
  }, []);

  const close = useCallback(() => {
    setOpened(false);
  }, []);

  return { open, close, opened };
};
