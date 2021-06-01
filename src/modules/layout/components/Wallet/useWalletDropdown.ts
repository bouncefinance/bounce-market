import { useLayout } from 'modules/layout/hooks/useLayout';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { disconnect } from '../../../account/store/actions/disconnect';

export function useWalletDropdown() {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { toggleNav, mobileNavShowed } = useLayout();

  const handleClose = useCallback(() => {
    if (isOpen) {
      setOpen(false);
    }

    if (mobileNavShowed) {
      toggleNav(false);
    }
  }, [isOpen, mobileNavShowed, toggleNav]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDisconnect = useCallback(() => {
    dispatch(disconnect());
    setOpen(false);
  }, [dispatch]);

  return {
    isOpened: isOpen,
    handleDisconnect,
    handleClose,
    handleOpen,
  };
}
