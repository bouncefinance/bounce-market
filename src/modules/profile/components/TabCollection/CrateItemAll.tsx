import { useQuery } from '@redux-requests/react';
import { ProductCardSkeleton } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { fetchCollection } from 'modules/profile/actions/fetchCollection';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { NoItems } from 'modules/common/components/NoItems';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { uid } from 'react-uid';
import { NftItemCard } from 'modules/common/components/ProductCard/NftItemCard';
import { INftItem } from 'modules/api/common/itemType';
import { useWeb3React } from 'modules/account/hooks/useWeb3React';
import { compare } from 'modules/brand/api/queryBrand';

export const CrateItemAll: React.FC<{
  isOther?: boolean;
  artAddress: string;
  reload?: () => void;
}> = ({ isOther = false, artAddress, reload }) => {
  const { address } = useWeb3React();
  const { data: collectionData, loading: collectionLoading } = useQuery<
    INftItem[]
  >({
    type: fetchCollection.toString(),
  });

  return (
    <TabItemsComponent>
      <ProductCards isLoading={collectionLoading}>
        {collectionLoading ? (
          <ProductCardSkeleton />
        ) : (
          collectionData?.map(item => (
            <NftItemCard
              key={uid(item)}
              reload={reload}
              item={item}
              isOther={isOther}
              tokenSymbol=""
              isTotalSupply={!Boolean(address && compare(artAddress, address))}
              hasAction={Boolean(artAddress && compare(artAddress, address))}
            />
          ))
        )}
      </ProductCards>
      {!collectionLoading && collectionData?.length === 0 && (
        <NoItems href={MarketRoutesConfig.Market.generatePath()} />
      )}
    </TabItemsComponent>
  );
};
