import { ThemeProvider } from '@material-ui/styles';
import { useDispatchRequest } from '@redux-requests/react';
import { DetailsNFTRoutesConfig } from 'modules/detailsNFT/DetailsNFTRoutes';
import { Clubs } from 'modules/overview/components/Clubs';
import { Movers } from 'modules/overview/components/Movers';
import { Products } from 'modules/overview/components/Products';
import { Promo } from 'modules/overview/components/Promo';
import { darkTheme } from 'modules/themes/darkTheme';
import React, { useEffect } from 'react';
import { Queries } from '../../../common/components/Queries/Queries';
import { t } from '../../../i18n/utils/intl';
import { useItems } from '../../../marketplace/hooks/useItems';
import { MarketplaceActions } from '../../../marketplace/marketplaceActions';
import { RoutesConfiguration } from '../../Routes';

function mapPromoItem(
  item: Exclude<ReturnType<typeof useItems>['data'], null>[0],
) {
  return {
    title: item.itemname || '',
    text: item.itemname || '',
    createdBy: item.itemname || '',
    avatar: 'https://via.placeholder.com/40x40',
    price: t('unit.BNB-value', {
      value: item.price.toNumber(),
    }),
    img: item.fileurl,
    thumbImg: item.fileurl || '',
    href: DetailsNFTRoutesConfig.DetailsNFT.generatePath(item.id),
    authorHref: RoutesConfiguration.Overview.generatePath(),
  };
}

function mapMoversItem(
  item: Exclude<ReturnType<typeof useItems>['data'], null>[0],
) {
  return {
    title: item.itemname || '',
    price: item.price,
    priceType: 'USDT',
    endDate: new Date(2021, 3, 30),
    likes: 100,
    href: DetailsNFTRoutesConfig.DetailsNFT.generatePath(item.id),
    img: item.fileurl || '',
    ProfileInfoProps: {
      subTitle: 'Owner',
      title: '1livinginzen',
      users: [
        {
          name: 'name',
          avatar: 'https://via.placeholder.com/32',
        },
      ],
    },
  };
}

export const Overview = () => {
  const { data } = useItems();
  const promoItems = data?.splice(0, 3);
  const fastMoversItems = data?.splice(3, 12);
  const dispatchRequest = useDispatchRequest();
  useEffect(() => {
    dispatchRequest(MarketplaceActions.fetchPools()).then(({ data }) => {
      if (data) {
        const ids = data.tradePools
          .map(item => item.tokenId)
          .concat(data.tradeAuctions.map(item => item.tokenId));

        dispatchRequest(
          MarketplaceActions.fetchItems({
            ids,
            channel: 'Sports',
          }),
        );
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
            <Promo stackDown items={promoItems?.map(mapPromoItem) || []} />
          )}
        </Queries>
      </ThemeProvider>

      <Queries
        requestActions={[
          MarketplaceActions.fetchPools,
          MarketplaceActions.fetchItems,
        ]}
      >
        {() => (
          <Movers
            stackUp
            stackDown
            items={fastMoversItems?.map(mapMoversItem) || []}
          />
        )}
      </Queries>

      <ThemeProvider theme={darkTheme}>
        {/* <Artists /> */}
        <Clubs />
        {/* <Brands /> */}
      </ThemeProvider>

      <Products stackUp items={fastMoversItems?.map(mapMoversItem) || []} />
    </>
  );
};
