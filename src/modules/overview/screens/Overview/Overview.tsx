import { ThemeProvider } from '@material-ui/styles';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { Artists } from 'modules/overview/components/Artists';
import { Brands } from 'modules/overview/components/Brands';
import { Movers, ProductProps } from 'modules/overview/components/Movers';
import { Products } from 'modules/overview/components/Products';
import { IPromoItem, Promo } from 'modules/overview/components/Promo';
import { darkTheme } from 'modules/themes/darkTheme';
import React, { useEffect } from 'react';
import { t } from '../../../i18n/utils/intl';
import { RoutesConfiguration } from '../../Routes';
import { Queries } from '../../../common/components/Queries/Queries';
import { ResponseData } from '../../../common/types/ResponseData';
import { useDispatchRequest } from '@redux-requests/react';
import { fetchOverview } from '../../actions/fetchOverview';
import { IItem } from '../../api/getItems';
import { fetchPopularBrands } from 'modules/brand/actions/fetchPopularBrands';

const ENABLE_ARTISTS = false;

const PROMO_ITEMS_COUNT = 3;

function mapPromoItem(item: IItem): IPromoItem {
  return {
    title: item.itemName || '',
    text: item.itemName || '',
    createdBy: item.itemName || '',
    avatar: 'https://via.placeholder.com/40x40',
    price: t('unit.BNB-value', {
      value: item.price.toNumber(),
    }),
    img: item.fileUrl,
    thumbImg: item.fileUrl || '',
    href:
      item.poolId && item.poolType
        ? BuyNFTRoutesConfig.DetailsNFT.generatePath(item.poolId, item.poolType)
        : '',
    authorHref: RoutesConfiguration.Overview.generatePath(),
  };
}

function mapMoversItem(item: IItem): ProductProps {
  return {
    title: item.itemName || '',
    price: item.price,
    priceType: 'USDT',
    endDate: new Date(2021, 3, 30),
    likes: 100,
    href:
      item.poolId && item.poolType
        ? BuyNFTRoutesConfig.DetailsNFT.generatePath(item.poolId, item.poolType)
        : '',
    img: item.fileUrl || '',
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
  const dispatch = useDispatchRequest();
  useEffect(() => {
    dispatch(fetchOverview());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPopularBrands());
  }, [dispatch]);

  return (
    <>
      <Queries<ResponseData<typeof fetchOverview>>
        requestActions={[fetchOverview]}
      >
        {({ loading, error, data }) => (
          <>
            <ThemeProvider theme={darkTheme}>
              <Promo
                stackDown
                error={error}
                isLoading={loading}
                items={data.slice(0, PROMO_ITEMS_COUNT).map(mapPromoItem)}
              />
            </ThemeProvider>
            <Movers
              stackUp
              stackDown
              error={error}
              isLoading={loading}
              items={data
                .slice(PROMO_ITEMS_COUNT, data.length)
                .map(mapMoversItem)}
            />
          </>
        )}
      </Queries>

      {ENABLE_ARTISTS && (
        <ThemeProvider theme={darkTheme}>
          <Artists />
        </ThemeProvider>
      )}

      <Queries<ResponseData<typeof fetchPopularBrands>>
        requestActions={[fetchPopularBrands]}
      >
        {({ loading, error, data }) => (
          <ThemeProvider theme={darkTheme}>
            <Brands
              stackUp
              stackDown
              isLoading={loading}
              error={error}
              items={data}
            />
          </ThemeProvider>
        )}
      </Queries>

      <Products stackUp items={[]} />
    </>
  );
};
