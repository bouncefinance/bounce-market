import { NoItems } from 'modules/common/components/NoItems';
import { ProductCardSkeleton } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { uid } from 'react-uid';
import { t } from 'modules/i18n/utils/intl';
import { useWeb3React } from 'modules/account/hooks/useWeb3React';
import { compare } from 'modules/brand/api/queryBrand';
import { FtItemCard, FT_CONFIG_LIST, IFtConfig } from 'modules/common/components/ProductCard/FtItemCard';
import { useEffect, useState } from 'react';

export const TabOwnedFt: React.FC<{
  isOther?: boolean;
  address?: string;
  reload?: () => void;
}> = function ({ isOther = false, address: artAddress, reload }) {
  // const { data, loading } = useQuery<INftItem[]>({
  //   type: fetchOwned.toString(),
  // });
  const data: IFtConfig[] = FT_CONFIG_LIST
  const { address } = useWeb3React();
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
            <FtItemCard
              key={uid(item)}
              item={item}
              reload={reload}
              isOther={isOther}
              hasAction={Boolean(artAddress && compare(artAddress, address))}
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
