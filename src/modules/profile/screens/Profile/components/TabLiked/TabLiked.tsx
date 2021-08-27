import { useQuery } from '@redux-requests/react';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCardSkeleton } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { queryLikedItems } from 'modules/profile/actions/queryLikedItems';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { t } from 'modules/i18n/utils/intl';
import { uid } from 'react-uid';
import { INftItem } from 'modules/api/common/itemType';
import { NftItemCard } from 'modules/common/components/ProductCard/NftItemCard';

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
            <NftItemCard
              key={uid(item)}
              item={item}
              isOther={isOther}
              tokenSymbol={(data as any)?.tokenSymbol}
              isTotalSupply
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
