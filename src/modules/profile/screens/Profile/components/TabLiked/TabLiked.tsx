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
import { queryLikedItems } from 'modules/profile/actions/queryLikedItems';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { t } from 'modules/i18n/utils/intl';
import { uid } from 'react-uid';
import { INftItem } from 'modules/api/common/itemType';

export const TabLiked: React.FC<{ isOther?: boolean }> = function ({
  isOther = false,
}) {
  const { data, loading } = useQuery<INftItem[]>({
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
              id={item.tokenId}
              poolId={0}
              isItemType
              key={uid(item)}
              title={item.name}
              href={BuyNFTRoutesConfig.Details_ITEM_NFT.generatePath(
                item.tokenId,
                item.contractAddress,
              )}
              contractAddress={item.contractAddress}
              likes={item.likeCount}
              isLike={item.isLike}
              priceType={(data as any)?.tokenSymbol}
              copies={item?.supply ?? 0}
              copiesBalance={item?.balance ?? 0}
              MediaProps={{
                category: item.category,
                src: item.fileUrl || 'xxx',
                objectFit: 'contain',
                loading: 'lazy',
              }}
              toSale={
                isOther
                  ? undefined
                  : RoutesConfiguration.PublishNft.generatePath(
                      item.contractAddress,
                      item.tokenId,
                    )
              }
              profileInfo={
                <ProfileInfo
                  subTitle="Creator"
                  title={item.name}
                  users={item.avatars}
                />
              }
            />
          ))
        )}
      </ProductCards>
      {!loading && data?.length === 0 && (
        <NoItems
          href={MarketRoutesConfig.Market.generatePath()}
          title={t('profile.no-items.Liked-title')}
          descr={t('profile.no-items.Liked-description')}
        />
      )}
    </TabItemsComponent>
  );
};
