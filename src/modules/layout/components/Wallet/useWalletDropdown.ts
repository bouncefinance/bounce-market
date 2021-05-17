import { useCallback, useState } from 'react';
import { disconnect } from '../../../account/store/actions/disconnect';
import { useDispatch } from 'react-redux';

export function useWalletDropdown() {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  return {
    isOpened: isOpen,
    handleDisconnect: useCallback(() => {
      dispatch(disconnect());
      setOpen(false);
    }, [dispatch]),
    handleClose: useCallback(() => {
      setOpen(false);
    }, []),
    handleOpen: useCallback(() => {
      setOpen(true);
    }, []),
  };
}
