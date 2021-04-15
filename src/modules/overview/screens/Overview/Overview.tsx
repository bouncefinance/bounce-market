import { ThemeProvider } from '@material-ui/styles';
import { MarketplaceActions } from 'modules/marketplace/marketplaceActions';
import { Movers } from 'modules/overview/components/Movers';
import { Promo } from 'modules/overview/components/Promo';
import { darkTheme } from 'modules/themes/darkTheme';
import { useEffect } from 'react';
import { useAppDispatch } from 'store/useAppDispatch';

export const Overview = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(MarketplaceActions.fetchMarketplaceItems());
  }, [dispatch]);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Promo />
      </ThemeProvider>
      <Movers />
    </>
  );
};
