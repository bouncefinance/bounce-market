import { useQuery } from '@redux-requests/react';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { UserRoleEnum } from 'modules/common/actions/queryAccountInfo';
import { NoItems } from 'modules/common/components/NoItems';
import {
  ProductCard,
  ProductCardSkeleton,
} from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { RoutesConfiguration } from 'modules/createNFT/Routes';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { fetchMySale, IPoolNftItem } from 'modules/profile/actions/fetchSale';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { uid } from 'react-uid';
import { t } from 'modules/i18n/utils/intl';
import {
  ILikedItem,
  queryLikedItems,
} from 'modules/profile/actions/queryLikedItems';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPoolKey } from 'modules/common/utils/poolHelps';
import { useLikesMap } from 'modules/common/hooks/usePoolList';
// import { usePoolList } from 'modules/common/hooks/usePoolList';

export const TabSale: React.FC<{ isOther?: boolean }> = function ({
  isOther = false,
}) {
  const { data, loading } = useQuery<IPoolNftItem[]>({
    type: fetchMySale.toString(),
  });

  const dispatch = useDispatch();
  const { data: likes, loading: likesPadding } = useQuery<ILikedItem[]>({
    type: queryLikedItems.toString(),
  });
  const { likesMap } = useLikesMap<ILikedItem>(likes ?? []);
  useEffect(() => {
    if (isOther) {
      dispatch(queryLikedItems());
    }
  }, [dispatch, isOther]);

  // const bidsInfo = usePoolList({
  //   list:
  //     data?.map(e => ({ poolId: e.poolid ?? -1, poolType: e.poolType })) ?? [],
  //   contractFunctionName: 'currentBidderAmount1P',
  // });
  // const bidsReserveAmount = usePoolList({
  //   list:
  //     data?.map(e => ({ poolId: e.poolid ?? -1, poolType: e.poolType })) ?? [],
  //   contractFunctionName: 'reserveAmount1P',
  // });

  return (
    <TabItemsComponent>
      <ProductCards isLoading={loading}>
        {loading || likesPadding ? (
          <ProductCardSkeleton />
        ) : (
          data?.map((item, index) => (
            <ProductCard
              id={item.tokenid}
              poolId={item.poolid || 0}
              auctionType={item.poolType}
              key={uid(item)}
              title={item.itemname}
              href={
                item.poolid && item.poolType
                  ? BuyNFTRoutesConfig.DetailsNFT.generatePath(
                      item.poolid,
                      item.poolType,
                    )
                  : ''
              }
              likes={item.likecount}
              isLike={
                isOther
                  ? likesMap?.get(
                      getPoolKey({
                        poolId: item.poolid,
                        poolType: item.poolType,
                      }),
                    )
                  : item.isLike
              }
              price={item.poolid ? item.price : undefined}
              priceType={(data as any)?.tokenSymbol}
              soldData={{
                sold: item.swapped_amount0,
                quantity: item.token_amount0,
              }}
              endDate={
                item.close_at ? new Date(item.close_at * 1e3) : undefined
              }
              MediaProps={{
                category: item.category,
                src: item.fileurl || 'xxx',
                objectFit: 'contain',
                loading: 'lazy',
              }}
              state={item.state}
              isOnSale
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
              toSale={RoutesConfiguration.PublishNft.generatePath(
                item.token0,
                item.tokenid,
              )}
              isCancelTimePut={item.openAt ? +item.openAt >= Date.now() : false}
              openAt={item.openAt}
              closeAt={item.closeAt}
              isOnSeller
              // bidTopPrice={bidsInfo[index]?.toNumber() || 0}
              // bidsReserveAmount={bidsReserveAmount[index]?.toNumber() || 0}
              isCreatorClaimed={Boolean(item.creator_claimed)}
              isBidderClaimed={Boolean(item.bidder_claimed)}
            />
          ))
        )}
      </ProductCards>
      {!loading && data?.length === 0 && (
        <NoItems
          href={MarketRoutesConfig.Market.generatePath()}
          title={t('profile.no-items.onSale-title')}
          descr={t('profile.no-items.onSale-description')}
        />
      )}
    </TabItemsComponent>
  );
};
