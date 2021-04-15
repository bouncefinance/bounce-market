import { Container, Typography } from '@material-ui/core';
import { Section } from 'modules/uiKit/Section';
import { ThemeProvider } from '@material-ui/styles';
import { Movers } from 'modules/overview/components/Movers';
import { Promo } from 'modules/overview/components/Promo';
import { darkTheme } from 'modules/themes/darkTheme';
import React from 'react';
import { useEffect } from 'react';
import { t } from '../../../i18n/utils/intl';
import { useDispatchRequest } from '@redux-requests/react';
import { MarketplaceActions } from '../../../marketplace/marketplaceActions';

export const Overview = () => {
  const dispatchRequest = useDispatchRequest();
  useEffect(() => {
    dispatchRequest(MarketplaceActions.fetchPools()).then(({ data }) => {
      if (data) {
        const ids = data.tradePools
          .concat(data.tradeAuctions)
          .map(item => item.tokenId);

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
    </>
  );
};
