import { useQuery } from '@redux-requests/react';
import { AuctionState } from 'modules/api/common/AuctionState';
import { FixedSwapState } from 'modules/api/common/FixedSwapState';
import { IPoolNftItem } from 'modules/api/common/poolType';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import {
  ProductCard,
  ProductCardCategoryType,
} from 'modules/common/components/ProductCard';
import { SwiperPreloader } from 'modules/common/components/SwiperPreloader';
import { isFixedSwap } from 'modules/common/utils/poolHelps';
import { fetchOverview } from 'modules/overview/actions/fetchOverview';
import { PROMO_ITEMS_COUNT } from 'modules/overview/const';
import { ISectionProps } from 'modules/uiKit/Section';
import { useMemo } from 'react';
import { uid } from 'react-uid';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { MoversComponent } from './MoversComponent';
import { UserRoleEnum } from 'modules/common/actions/queryAccountInfo';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';

export const Movers = (sectionProps: ISectionProps) => {
  const overviewQuery = useQuery<IPoolNftItem[] | null>({
    type: fetchOverview.toString(),
  });

  const slicedItems = useMemo(
    () =>
      overviewQuery.data
        ? overviewQuery.data.slice(PROMO_ITEMS_COUNT, overviewQuery.data.length)
        : [],
    [overviewQuery.data],
  );

  const renderedItems = slicedItems.map(item => {
    return (
      <ProductCard
        key={uid(item)}
        id={item.tokenId ?? 0}
        poolId={item.poolId || 0}
        auctionType={item.poolType}
        isOnSale
        title={item.itemName || ''}
        price={item.price}
        priceType={(overviewQuery.data as any)?.tokenSymbol}
        endDate={item.closeAt}
        soldData={{
          sold: item.swapped_amount0,
          quantity: item.token_amount0,
        }}
        likes={item.likeCount}
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
          item.poolType && isFixedSwap(item.poolType)
            ? FixedSwapState.Live
            : AuctionState.Live
        }
        profileInfo={
          <ProfileInfo
            subTitle="Creator"
            title={item.username || truncateWalletAddr(item.creator)}
            users={[
              {
                name: item.username,
                avatar: item.creatorurl,
                href: ProfileRoutesConfig.OtherProfile.generatePath(
                  item.creator,
                ),
                verified: item?.identity === UserRoleEnum.Verified,
              },
            ]}
          />
        }
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
