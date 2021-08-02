import { useQuery } from '@redux-requests/react';
import { AuctionState } from 'modules/api/common/AuctionState';
import { AuctionType } from 'modules/api/common/auctionType';
import { FixedSwapState } from 'modules/api/common/FixedSwapState';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { AccountInfo } from 'modules/common/components/AccountInfo';
import {
  ProductCard,
  ProductCardCategoryType,
} from 'modules/common/components/ProductCard';
import { SwiperPreloader } from 'modules/common/components/SwiperPreloader';
import {
  fetchOverview,
  IOverviewItem,
} from 'modules/overview/actions/fetchOverview';
import { PROMO_ITEMS_COUNT } from 'modules/overview/const';
import { ISectionProps } from 'modules/uiKit/Section';
import { useMemo } from 'react';
import { uid } from 'react-uid';
import { MoversComponent } from './MoversComponent';

export const Movers = (sectionProps: ISectionProps) => {
  const overviewQuery = useQuery<IOverviewItem[] | null>({
    type: fetchOverview.toString(),
  });

  const slicedItems = useMemo(
    () =>
      overviewQuery.data
        ? overviewQuery.data.slice(PROMO_ITEMS_COUNT, overviewQuery.data.length)
        : [],
    [overviewQuery.data],
  );

  // console.log('--slicedItems---', slicedItems)
  const renderedItems = slicedItems.map(item => {
    return (
      <ProductCard
        key={uid(item)}
        id={item.id}
        poolId={item.poolId || 0}
        auctionType={item.poolType}
        isOnSale
        title={item.itemName || ''}
        price={item.price}
        priceType={item.tokenSymbol}
        endDate={item.closeAt}
        copies={item.supply}
        likes={item.likeCount}
        isLike={item.isLike}
        href={
          item.poolId && item.poolType
            ? BuyNFTRoutesConfig.DetailsNFT.generatePath(
                item.poolId,
                item.poolType,
              )
            : ''
        }
        imgPreloader={<SwiperPreloader />}
        MediaProps={{
          category: item.category as ProductCardCategoryType,
          src: item.fileUrl || '',
          imgClassName: 'swiper-lazy',
          isNativeLazyLoading: false,
          objectFit: 'contain',
        }}
        state={
          item.poolType === AuctionType.FixedSwap ||
          item.poolType === AuctionType.FixedSwap_Timing
            ? FixedSwapState.Live
            : AuctionState.Live
        }
        profileInfo={<AccountInfo address={item.ownerAddress} />}
        openAt={item.openAt}
      />
    );
  });

  return (
    <MoversComponent
      {...sectionProps}
      isLoading={overviewQuery.loading}
      itemCount={overviewQuery.data ? overviewQuery.data.length : 0}
    >
      {renderedItems}
    </MoversComponent>
  );
};
