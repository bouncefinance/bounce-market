import { useQuery } from '@redux-requests/react';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { NoItems } from 'modules/common/components/NoItems';
import {
  ProductCard,
  ProductCardSkeleton,
} from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { CardProfileInfo } from 'modules/common/components/ProfileInfo';
import { RoutesConfiguration } from 'modules/createNFT/Routes';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { fetchMyBids } from 'modules/profile/actions/fetchSale';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { uid } from 'react-uid';
import { t } from 'modules/i18n/utils/intl';
import { usePoolList } from 'modules/common/hooks/usePoolList';
import { useAccount } from 'modules/account/hooks/useAccount';
import { IPoolNftItem } from 'modules/api/common/poolType';
import { isFixedSwap } from 'modules/common/utils/poolHelps';

export const TabBids: React.FC<{
  reload?: () => void;
}> = function ({ reload }) {
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

  const filter = (item: IPoolNftItem, index: number) => {
    const bidTopPrice = bidsInfo[index]?.toNumber();
    const _myBidderAmount = myBidderAmount[index]?.toNumber() || 0;
    const now = Date.now();
    return !(
      !isFixedSwap(item.poolType) &&
      _myBidderAmount > 0 &&
      _myBidderAmount < bidTopPrice &&
      item.closeAt &&
      +item.closeAt <= now
    );
  };
  const showList = data?.filter(filter) ?? [];
  return (
    <TabItemsComponent>
      <ProductCards isLoading={loading}>
        {loading ? (
          <ProductCardSkeleton />
        ) : (
          showList?.map((item, index) => {
            const bidTopPrice = bidsInfo[index]?.toNumber();
            const bidsReservePrice = bidsReserveAmount[index]?.toNumber();

            return (
              <ProductCard
                reload={reload}
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
                contractAddress={item.token0}
                likes={item.likecount}
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
                  <CardProfileInfo
                    subTitle="Creator"
                    title={item.itemname}
                    users={item.avatars}
                    nftCardOption={{
                      ...item.nftCardOption,
                      isOnSale: true,
                    }}
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
      {!loading && showList?.length === 0 && (
        <NoItems
          href={MarketRoutesConfig.Market.generatePath()}
          title={t('profile.no-items.MyBids-title')}
          descr={t('profile.no-items.MyBids-description')}
        />
      )}
    </TabItemsComponent>
  );
};
