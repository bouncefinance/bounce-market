import { NoItems } from 'modules/common/components/NoItems';
import { ProductCardSkeleton } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { uid } from 'react-uid';
import { t } from 'modules/i18n/utils/intl';
import { useEffect, useState } from 'react';
import { FtPoolCard } from 'modules/common/components/ProductCard/FtPoolCard';

export const TabSelaErc20: React.FC<{
  isOther?: boolean;
  reload?: () => void;
}> = function ({ isOther = false, reload }) {
  // const { data, loading } = useQuery<INftItem[]>({
  //   type: fetchOwned.toString(),
  // });
  const data: any[] = [
    1,2,3,4,5
  ]
  const [loading, setLoding] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setLoding(false)
    }, 500)
  }, [])

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
