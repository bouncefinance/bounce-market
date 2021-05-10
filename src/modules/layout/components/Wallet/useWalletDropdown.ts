import { useCallback, useState } from 'react';

export function useWalletDropdown() {
  const [isOpen, setOpen] = useState(false);

  return {
    isOpened: isOpen,
    handleClose: useCallback(() => {
      setOpen(false);
    }, []),
    handleOpen: useCallback(() => {
      setOpen(true);
    }, []),
  };
}
