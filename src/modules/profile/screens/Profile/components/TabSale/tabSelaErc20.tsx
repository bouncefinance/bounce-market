import { NoItems } from 'modules/common/components/NoItems';
import { ProductCardSkeleton } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { uid } from 'react-uid';
import { t } from 'modules/i18n/utils/intl';
import { FtPoolCard } from 'modules/common/components/ProductCard/FtPoolCard';
import { useQuery } from '@redux-requests/react';
import { fetchOnsellApeMarketPools, IApePoolMArketRes } from 'modules/market/actions/ftMarketList';

export const TabSelaErc20: React.FC<{
  isOther?: boolean;
  reload?: () => void;
}> = function ({ isOther = false, reload }) {
  const { data: res, loading } = useQuery<IApePoolMArketRes>({
    type: fetchOnsellApeMarketPools.toString(),
  });
  const data = res.data

  return (
    <TabItemsComponent>
      <ProductCards isLoading={loading}>
        {loading ? (
          <ProductCardSkeleton />
        ) : (
          data?.map(item => (
            <FtPoolCard
              key={uid(item)}
              reload={reload}
              isOther={isOther}
              item={item}
              // hasAction={Boolean(artAddress && compare(artAddress, address))}
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
              ? t('profile.no-items.other-showCase-description-coin', {coinName: 'FT'})
              : t('profile.no-items.showCase-description-coin', {coinName: 'FT'})
          }
        />
      )}
    </TabItemsComponent>
  );
};
