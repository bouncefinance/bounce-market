import { ThemeProvider } from '@material-ui/styles';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { fetchPopularBrands } from 'modules/brand/actions/fetchPopularBrands';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { ProductCardCategoryType } from 'modules/common/components/ProductCard';
import { featuresConfig } from 'modules/common/conts';
import { Artists } from 'modules/overview/components/Artists';
import { Brands } from 'modules/overview/components/Brands';
import { Movers } from 'modules/overview/components/Movers';
import { Products } from 'modules/overview/components/Products';
import { IPromoItem, Promo } from 'modules/overview/components/Promo';
import { darkTheme } from 'modules/themes/darkTheme';
import React, { useEffect } from 'react';
import { Queries } from '../../../common/components/Queries/Queries';
import { ResponseData } from '../../../common/types/ResponseData';
import { t } from '../../../i18n/utils/intl';
import { fetchOverview } from '../../actions/fetchOverview';
import { IItem } from '../../api/getItems';
import { RoutesConfiguration } from '../../Routes';

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

function mapMoversItem(item: IItem) {
  return {
    title: item.itemName || '',
    price: item.price,
    priceType: 'BNB',
    endDate: item.closeAt,
    likes: item.likeCount,
    copies: item.supply,
    href:
      item.poolId && item.poolType
        ? BuyNFTRoutesConfig.DetailsNFT.generatePath(item.poolId, item.poolType)
        : '',
    MediaProps: {
      category: 'image' as ProductCardCategoryType,
      src: item.fileUrl || '',
    },
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
  const overviewQuery = useQuery({ type: fetchOverview.toString() });
  const popularBrandsQuery = useQuery({ type: fetchPopularBrands.toString() });

  useEffect(() => {
    if (!overviewQuery.data) {
      dispatch(fetchOverview());
    }
  }, [dispatch, overviewQuery.data]);

  useEffect(() => {
    if (!popularBrandsQuery.data) {
      dispatch(fetchPopularBrands());
    }
  }, [dispatch, popularBrandsQuery.data]);

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

      {featuresConfig.artists && (
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

      <Products stackUp />
    </>
  );
};
