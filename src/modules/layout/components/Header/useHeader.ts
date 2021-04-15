import React, { useCallback, useState } from 'react';
import { useAppDispatch } from '../../../../store/useAppDispatch';
import { AccountActions } from '../../../account/store/accountActions';

export const useHeader = () => {
  const [mobileNavShowed, setMobileNavShowed] = useState(false);
  const [searchShowed, setSearchShowed] = useState(false);
  const dispatch = useAppDispatch();

  const toggleNav = useCallback(
    (isOpen: boolean) => (event: any) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setMobileNavShowed(isOpen);
    },
    [],
  );

  const toggleSearch = useCallback(
    (isOpen: boolean) => (event: any) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setSearchShowed(isOpen);
    },
    [],
  );

  const handleConnect = useCallback(() => {
    dispatch(AccountActions.connect());
  }, [dispatch]);

  return {
    mobileNavShowed,
    toggleNav,
    searchShowed,
    toggleSearch,
    handleConnect,
  };
};
