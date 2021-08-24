import { useQuery } from '@redux-requests/react';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { NoItems } from 'modules/common/components/NoItems';
import {
  ProductCard,
  ProductCardSkeleton,
} from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { RoutesConfiguration } from 'modules/createNFT/Routes';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { fetchMySale } from 'modules/profile/actions/fetchSale';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { uid } from 'react-uid';
import { t } from 'modules/i18n/utils/intl';
import { getPoolKey, isFixedSwap } from 'modules/common/utils/poolHelps';
import { usePoolList } from 'modules/common/hooks/usePoolList';
import { useMemo } from 'react';
import { IPoolNftItem } from 'modules/api/common/poolType';

const getStandardPoolObj = (e: IPoolNftItem) => ({
  poolId: e.poolid,
  poolType: e.poolType,
});

export const TabSale: React.FC<{
  isOther?: boolean;
  reload?: () => void;
}> = function ({ isOther = false, reload }) {
  const { data, loading } = useQuery<IPoolNftItem[]>({
    type: fetchMySale.toString(),
  });

  const poolList = useMemo(() => {
    return data?.filter(e => !isFixedSwap(e.poolType));
  }, [data]);
  const bidsInfo = usePoolList({
    list: poolList?.map(getStandardPoolObj) ?? [],
    contractFunctionName: 'currentBidderAmount1P',
  });
  const bidsReserveAmount = usePoolList({
    list: poolList?.map(getStandardPoolObj) ?? [],
    contractFunctionName: 'reserveAmount1P',
  });

  const poolMap = useMemo(() => {
    const map = new Map<
      string,
      { bidTopPrice: number; bidsReserveAmount: number }
    >();
    poolList?.forEach((e, i) => {
      map.set(getPoolKey(getStandardPoolObj(e)), {
        bidTopPrice: bidsInfo[i]?.toNumber() ?? 0,
        bidsReserveAmount: bidsReserveAmount[i]?.toNumber() ?? 0,
      });
    });
    return map;
  }, [bidsInfo, bidsReserveAmount, poolList]);

  return (
    <TabItemsComponent>
      <ProductCards isLoading={loading}>
        {loading ? (
          <ProductCardSkeleton />
        ) : (
          data?.map((item, index) => {
            const bidTopPrice =
              poolMap?.get(getPoolKey(getStandardPoolObj(item)))?.bidTopPrice ||
              0;

            const bidsReservePrice =
              poolMap?.get(getPoolKey(getStandardPoolObj(item)))
                ?.bidsReserveAmount || 0;

            return (
              <ProductCard
                reload={reload}
                id={item.tokenid}
                poolId={item.poolid || 0}
                auctionType={item.poolType}
                key={uid(item)}
                title={item.itemname}
                href={
                  item.poolid !== undefined && item.poolType
                    ? BuyNFTRoutesConfig.DetailsNFT.generatePath(
                        item.poolid,
                        item.poolType,
                      )
                    : ''
                }
                contractAddress={item.token0}
                likes={item.likecount}
                price={item.poolid !== undefined ? item.price : undefined}
                priceType={(data as any)?.tokenSymbol}
                soldData={{
                  sold: isFixedSwap(item.poolType)
                    ? item.swapped_amount0
                    : Date.now() >= item.close_at * 1e3 &&
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
                isOther={isOther}
                openAt={item.openAt}
                closeAt={item.closeAt}
                isOnSeller
                bidTopPrice={bidTopPrice}
                bidsReserveAmount={bidsReservePrice}
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
          title={
            isOther
              ? t('profile.no-items.other-onSale-title')
              : t('profile.no-items.onSale-title')
          }
          descr={
            isOther
              ? t('profile.no-items.other-onSale-description')
              : t('profile.no-items.onSale-description')
          }
        />
      )}
    </TabItemsComponent>
  );
};
