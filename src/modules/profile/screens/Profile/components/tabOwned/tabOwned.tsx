import { useQuery } from '@redux-requests/react';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCardSkeleton } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { fetchOwned } from 'modules/profile/actions/fetchOwned';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { uid } from 'react-uid';
import { t } from 'modules/i18n/utils/intl';
import { INftItem } from 'modules/api/common/itemType';
import { NftItemCard } from 'modules/common/components/ProductCard/NftItemCard';

export const TabOwned: React.FC<{ isOther?: boolean }> = function ({
  isOther = false,
}) {
  const { data, loading } = useQuery<INftItem[]>({
    type: fetchOwned.toString(),
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
            />
          ))
        )}
      </ProductCards>
      {!loading && data?.length === 0 && (
        <NoItems
          href={MarketRoutesConfig.Market.generatePath()}
          title={
            isOther
              ? t('profile.no-items.other-showCase-title')
              : t('profile.no-items.showCase-title')
          }
          descr={
            isOther
              ? t('profile.no-items.other-showCase-description')
              : t('profile.no-items.showCase-description')
          }
        />
      )}
    </TabItemsComponent>
  );
};
