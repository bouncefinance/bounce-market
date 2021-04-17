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
import { INDEX_PATH } from '../../../router/const';
import { t } from '../../../i18n/utils/intl';
import { Queries } from '../../../common/components/Queries/Queries';

export const Overview = () => {
  const { data } = useItems();
  const promoItems = data?.splice(0, 3);
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
        <Queries
          requestActions={[
            MarketplaceActions.fetchPools,
            MarketplaceActions.fetchItems,
          ]}
        >
          {() => (
            <Promo
              stackDown
              items={
                promoItems?.map(item => ({
                  title: item.itemname!,
                  text: item.itemname!,
                  createdBy: item.itemname!,
                  avatar: 'https://via.placeholder.com/40x40',
                  price: t('unit.BNB-value', {
                    value: item.price.toNumber(),
                  }),
                  img: item.fileurl,
                  thumbImg: item.fileurl!,
                  href: INDEX_PATH,
                  authorHref: INDEX_PATH,
                })) || []
              }
            />
          )}
        </Queries>
      </ThemeProvider>

      <Movers />

      <ThemeProvider theme={darkTheme}>
        <Artists />
        <Brands />
      </ThemeProvider>
    </>
  );
};
