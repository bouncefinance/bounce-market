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
import { RoutesConfiguration } from 'modules/createNFT/Routes';
import { MarketRoutesConfig } from 'modules/market/Routes';
import {
  ILikedItem,
  IPoolNftItem,
  queryLikedItems,
} from 'modules/profile/actions/queryLikedItems';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { uid } from 'react-uid';

export const TabLiked = function () {
  const { data, loading } = useQuery<ILikedItem[]>({
    type: queryLikedItems.toString(),
  });

  return (
    <TabItemsComponent>
      <ProductCards isLoading={loading}>
        {loading ? (
          <ProductCardSkeleton />
        ) : (
          data?.map(item => (
            <ProductCard
              id={item.tokenid}
              poolId={item.poolid || 0}
              auctionType={item.poolType}
              isItemType={item.isItemType}
              key={uid(item)}
              title={item.name}
              href={
                item.poolid && item.poolType
                  ? BuyNFTRoutesConfig.DetailsNFT.generatePath(
                      item.poolid,
                      item.poolType,
                    )
                  : ''
              }
              likes={item.likecount}
              isLike={item.isLike}
              price={item.poolid ? item.price : undefined}
              priceType={(data as any)?.tokenSymbol}
              copies={item.isItemType ? item?.supply ?? 0 : item.token_amount0}
              copiesBalance={
                item.isItemType ? item?.balance ?? 0 : item.swapped_amount0
              }
              MediaProps={{
                category: item.category,
                src: item.fileurl || 'xxx',
                objectFit: 'contain',
                loading: 'lazy',
              }}
              state={item.state}
              isOnSale={!item.isItemType}
              profileInfo={
                <ProfileInfo
                  subTitle="Creator"
                  title={item.name}
                  users={[
                    {
                      name: item.name,
                      avatar: item.avatar,
                      verified: item?.identity === UserRoleEnum.Verified,
                    },
                  ]}
                />
              }
              toSale={RoutesConfiguration.PublishNft.generatePath(
                item.contractaddress,
                item.tokenid,
              )}
              isCancelTimePut={item.openAt ? +item.openAt >= Date.now() : false}
              openAt={item.openAt}
            />
          ))
        )}
      </ProductCards>
      {!loading && data?.length === 0 && (
        <NoItems href={MarketRoutesConfig.Market.generatePath()} />
      )}
    </TabItemsComponent>
  );
};
