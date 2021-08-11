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
import { fetchMyBids, IPoolNftItem } from 'modules/profile/actions/fetchSale';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { uid } from 'react-uid';
import { t } from 'modules/i18n/utils/intl';
import { usePoolList } from 'modules/common/hooks/usePoolList';
import { useAccount } from 'modules/account/hooks/useAccount';

export const TabBids = function () {
  const { address } = useAccount();
  const { data, loading } = useQuery<IPoolNftItem[]>({
    type: fetchMyBids.toString(),
  });

  const bidsInfo = usePoolList({
    list:
      data?.map(e => ({ poolId: e.pool_id ?? -1, poolType: e.poolType })) ?? [],
    contractFunctionName: 'currentBidderAmount1P',
  });
  const bidsReserveAmount = usePoolList({
    list:
      data?.map(e => ({ poolId: e.pool_id ?? -1, poolType: e.poolType })) ?? [],
    contractFunctionName: 'reserveAmount1P',
  });
  const myBidderAmount = usePoolList({
    list:
      data?.map(e => ({ poolId: e.pool_id ?? -1, poolType: e.poolType })) ?? [],
    contractFunctionName: 'myBidderAmount1P',
    address,
  });

  return (
    <TabItemsComponent>
      <ProductCards isLoading={loading}>
        {loading ? (
          <ProductCardSkeleton />
        ) : (
          data?.map((item, index) => {
            const bidTopPrice = bidsInfo[index]?.toNumber();
            const bidsReservePrice = bidsReserveAmount[index]?.toNumber();

            return (
              <ProductCard
                id={item.tokenid}
                poolId={item.pool_id || 0}
                auctionType={item.poolType}
                key={uid(item)}
                title={item.itemname}
                href={
                  item.pool_id && item.poolType
                    ? BuyNFTRoutesConfig.DetailsNFT.generatePath(
                        item.pool_id,
                        item.poolType,
                      )
                    : ''
                }
                likes={item.likecount}
                isLike={item.isLike}
                price={item.pool_id ? item.price : undefined}
                priceType={(data as any)?.tokenSymbol}
                soldData={{
                  sold:
                    Date.now() >= item.close_at * 1e3 &&
                    bidTopPrice >= bidsReservePrice
                      ? item.token_amount0
                      : 0,
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
                isCancelTimePut={
                  item.openAt ? +item.openAt >= Date.now() : false
                }
                openAt={item.openAt}
                closeAt={item.closeAt}
                bidTopPrice={bidTopPrice || 0}
                bidsReserveAmount={bidsReservePrice || 0}
                myBidderAmount={myBidderAmount[index]?.toNumber() || 0}
                isBidder
                isCreatorClaimed={Boolean(item.creator_claimed)}
                isBidderClaimed={Boolean(item.bidder_claimed)}
              />
            );
          })
        )}
      </ProductCards>
      {!loading && data?.length === 0 && (
        <NoItems
          href={MarketRoutesConfig.Market.generatePath()}
          title={t('profile.no-items.MyBids-title')}
          descr={t('profile.no-items.MyBids-description')}
        />
      )}
    </TabItemsComponent>
  );
};
