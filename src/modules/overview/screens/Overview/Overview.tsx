import { ThemeProvider } from '@material-ui/styles';
import { useDispatchRequest } from '@redux-requests/react';
import { Artists } from 'modules/overview/components/Artists';
import { Brands } from 'modules/overview/components/Brands';
import { Movers } from 'modules/overview/components/Movers';
import { Promo } from 'modules/overview/components/Promo';
import { darkTheme } from 'modules/themes/darkTheme';
import React, { useEffect } from 'react';
import { MarketplaceActions } from '../../../marketplace/marketplaceActions';
import { useItems } from '../../../marketplace/hooks/useItems';

export const Overview = () => {
  const data = useItems();
  console.log('data', data);
  const dispatchRequest = useDispatchRequest();
  useEffect(() => {
    dispatchRequest(MarketplaceActions.fetchPools()).then(({ data }) => {
      if (data) {
        const ids = data.tradePools
          .map(item => item.tokenId)
          .concat(data.tradeAuctions.map(item => item.tokenId));

        dispatchRequest(MarketplaceActions.fetchItems({ ids }));
      }
    });
  }, [dispatchRequest]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Promo />
      </ThemeProvider>

      <Movers />

      <ThemeProvider theme={darkTheme}>
        <Artists />
        <Brands />
      </ThemeProvider>
    </>
  );
};
