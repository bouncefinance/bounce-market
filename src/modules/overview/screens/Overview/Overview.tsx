import { ThemeProvider } from '@material-ui/styles';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { fetchPopularBrands } from 'modules/brand/actions/fetchPopularBrands';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { featuresConfig } from 'modules/common/conts';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { Artists } from 'modules/overview/components/Artists';
import { Brands } from 'modules/overview/components/Brands';
import { Movers } from 'modules/overview/components/Movers';
import { Products } from 'modules/overview/components/Products';
import { IPromoItem, Promo } from 'modules/overview/components/Promo';
import { PROMO_ITEMS_COUNT } from 'modules/overview/const';
import { darkTheme } from 'modules/themes/darkTheme';
import React, { useEffect } from 'react';
import { Queries } from '../../../common/components/Queries/Queries';
import { ResponseData } from '../../../common/types/ResponseData';
import { fetchOverview } from '../../actions/fetchOverview';
import { IItem } from '../../api/getItems';
import { RoutesConfiguration } from '../../Routes';
import { useOverviewStyles } from './useOverviewStyles';

function mapPromoItem(item: IItem): IPromoItem {
  return {
    title: item.itemName || '',
    text: item.description || '',
    createdBy: item.ownerName || truncateWalletAddr(item.ownerAddress),
    avatar: undefined,
    price: item.price,
    priceType: 'BNB',
    img: item.fileUrl,
    thumbImg: item.fileUrl || '',
    href:
      item.poolId && item.poolType
        ? BuyNFTRoutesConfig.DetailsNFT.generatePath(item.poolId, item.poolType)
        : '',
    authorHref: RoutesConfiguration.Overview.generatePath(),
  };
}

export const Overview = () => {
  const dispatch = useDispatchRequest();
  const overviewQuery = useQuery({ type: fetchOverview.toString() });
  const popularBrandsQuery = useQuery({ type: fetchPopularBrands.toString() });
  const classes = useOverviewStyles();

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
    <div className={classes.root}>
      <div className={classes.promoMoversWrap}>
        <Queries<ResponseData<typeof fetchOverview>>
          requestActions={[fetchOverview]}
        >
          {({ loading, error, data }) => (
            <ThemeProvider theme={darkTheme}>
              <Promo
                stackDown
                error={error}
                isLoading={loading}
                items={data.slice(0, PROMO_ITEMS_COUNT).map(mapPromoItem)}
              />
            </ThemeProvider>
          )}
        </Queries>
      </div>

      <Movers stackUp stackDown />

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
    </div>
  );
};
