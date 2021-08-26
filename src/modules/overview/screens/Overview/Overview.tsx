import { ThemeProvider } from '@material-ui/styles';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { fetchPopularBrands } from 'modules/brand/actions/fetchPopularBrands';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { featuresConfig } from 'modules/common/conts';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { IOverviewItem } from 'modules/overview/actions/fetchPoolsWeight';
import { Artists } from 'modules/overview/components/Artists';
import { Brands } from 'modules/overview/components/Brands';
import { Movers } from 'modules/overview/components/Movers';
import { Products } from 'modules/overview/components/Products';
import {
  IPromoItem,
  Promo,
  PromoSkeleton,
} from 'modules/overview/components/Promo';
import { PROMO_ITEMS_COUNT } from 'modules/overview/const';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { darkTheme } from 'modules/themes/darkTheme';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Queries } from '../../../common/components/Queries/Queries';
import { ResponseData } from '../../../common/types/ResponseData';
import { fetchOverview } from '../../actions/fetchOverview';
import { useOverviewStyles } from './useOverviewStyles';

function mapPromoItem(item: IOverviewItem, tokenSymbol: string): IPromoItem {
  return {
    title: item.itemName || '',
    text: item.description || '',
    createdBy:
      truncateWalletAddr(item.owner?.name ?? '') ||
      truncateWalletAddr(item.owner?.address ?? ''),
    avatar: item.owner?.avatar,
    price: item.price,
    priceType: tokenSymbol,
    category: item?.category,
    img: item.fileUrl,
    thumbImg: item.fileUrl || '',
    identity: item?.identity || 1,
    href:
      item.poolId !== undefined && item.poolType
        ? BuyNFTRoutesConfig.DetailsNFT.generatePath(item.poolId, item.poolType)
        : '',
    authorHref: ProfileRoutesConfig.OtherProfile.generatePath(
      item.creator?.address,
    ),
    MediaProps: {
      category: item.category,
      src: item.fileUrl || '',
    },
  };
}

export const Overview = () => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();
  const classes = useOverviewStyles();
  const { chainId } = useAccount();

  useEffect(() => {
    dispatchRequest(fetchOverview());
    dispatchRequest(fetchPopularBrands());

    return function reset() {
      dispatch(
        resetRequests([
          fetchOverview.toString(),
          fetchPopularBrands.toString(),
        ]),
      );
    };
  }, [chainId, dispatch, dispatchRequest]);

  const renderedPromoSkeleton = (
    <ThemeProvider theme={darkTheme}>
      <PromoSkeleton />
    </ThemeProvider>
  );

  return (
    <div className={classes.root}>
      <div className={classes.promoMoversWrap}>
        <Queries<ResponseData<typeof fetchOverview>>
          requestActions={[fetchOverview]}
          noDataMessage={renderedPromoSkeleton}
        >
          {({ loading, error, data }) => {
            return (
              <ThemeProvider theme={darkTheme}>
                <Promo
                  stackDown
                  error={error}
                  isLoading={loading}
                  items={data
                    .slice(0, PROMO_ITEMS_COUNT)
                    .map(item =>
                      mapPromoItem(item, (data as any).tokenSymbol as string),
                    )}
                />
              </ThemeProvider>
            );
          }}
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
