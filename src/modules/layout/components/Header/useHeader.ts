import { useLayout } from 'modules/layout/hooks/useLayout';
import React, { useCallback } from 'react';

const getIsTabKeyOrShiftKey = (event: React.KeyboardEvent) => {
  return (
    event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')
  );
};

export const useHeader = () => {
  const {
    toggleNav,
    toggleSearch,
    mobileNavShowed,
    searchShowed,
  } = useLayout();

  const onNavClose = useCallback(
    (event: any) => {
      if (getIsTabKeyOrShiftKey(event)) {
        return;
      }

      toggleNav(false);
    },
    [toggleNav],
  );

  const onNavOpen = useCallback(() => {
    toggleNav(true);
  }, [toggleNav]);

  const onSearchClose = useCallback(
    (event: any) => {
      if (getIsTabKeyOrShiftKey(event)) {
        return;
      }

      toggleSearch(false);
    },
    [toggleSearch],
  );

  const onSearchOpen = useCallback(() => {
    toggleSearch(true);
  }, [toggleSearch]);

  const onClickAwaySearch = useCallback(() => {
    if (searchShowed) {
      toggleSearch(false);
    }
  }, [searchShowed, toggleSearch]);

  const onClickAwayNav = useCallback(() => {
    if (mobileNavShowed) {
      toggleNav(false);
    }
  }, [mobileNavShowed, toggleNav]);

  return {
    onNavClose,
    onNavOpen,
    onSearchClose,
    onSearchOpen,
    onClickAwaySearch,
    onClickAwayNav,
    mobileNavShowed,
    searchShowed,
  };
};
