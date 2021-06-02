import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/useAppDispatch';
import { layoutActions, layoutSelectors } from '../store/layout';

export const useLayout = () => {
  const dispatch = useAppDispatch();
  const mobileNavShowed = useSelector(layoutSelectors.mobileNavShowed);
  const searchShowed = useSelector(layoutSelectors.searchShowed);

  const toggleNav = useCallback(
    (isOpen: boolean) => {
      dispatch(layoutActions.toggleNav(isOpen));
    },
    [dispatch],
  );

  const toggleSearch = useCallback(
    (isOpen: boolean) => {
      dispatch(layoutActions.toggleSearch(isOpen));
    },
    [dispatch],
  );

  return {
    mobileNavShowed,
    searchShowed,
    toggleNav,
    toggleSearch,
  };
};
