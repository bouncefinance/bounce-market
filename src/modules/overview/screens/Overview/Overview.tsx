import { ThemeProvider } from '@material-ui/styles';
import { DetailsNFTRoutesConfig } from 'modules/detailsNFT/DetailsNFTRoutes';
import { Clubs } from 'modules/overview/components/Clubs';
import { Movers } from 'modules/overview/components/Movers';
import { Products } from 'modules/overview/components/Products';
import { Promo } from 'modules/overview/components/Promo';
import { darkTheme } from 'modules/themes/darkTheme';
import React from 'react';
import { t } from '../../../i18n/utils/intl';
import { useItems } from '../../../marketplace/hooks/useItems';
import { RoutesConfiguration } from '../../Routes';
import { useOverview } from './useOverview';

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
  const {
    poolsLoading,
    poolsError,
    itemsLoading,
    itemsError,
    promoItems,
    fastMoversItems,
  } = useOverview();

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Promo
          stackDown
          error={poolsError || itemsError}
          isLoading={poolsLoading || itemsLoading}
          items={promoItems?.map(mapPromoItem)}
        />
      </ThemeProvider>

      <Movers
        stackUp
        stackDown
        error={poolsError || itemsError}
        isLoading={poolsLoading || itemsLoading}
        items={fastMoversItems?.map(mapMoversItem)}
      />

      <ThemeProvider theme={darkTheme}>
        {/* <Artists /> */}
        <Clubs />
        {/* <Brands /> */}
      </ThemeProvider>

      <Products stackUp items={fastMoversItems?.map(mapMoversItem) || []} />
    </>
  );
};
