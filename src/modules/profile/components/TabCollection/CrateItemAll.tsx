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
import { compare } from 'modules/brand/api/queryBrand';
import { useAccount } from 'modules/account/hooks/useAccount';
import { ZERO_ADDRESS } from 'modules/common/conts';
import { Pagination } from 'modules/uiKit/Pagination';
import { HEADER_HEIGHT_XL } from 'modules/layout/components/Header/HeaderStyles';
import { ChangeEvent, useMemo, useState } from 'react';
import { useProductsStyles } from 'modules/market/components/Products/useProductsStyles';

interface reloadOptions {
  offset: number;
}

const ITEMS_PORTION_COUNT = 10;
const DEFAULT_PAGE = 1;
export const CrateItemAll: React.FC<{
  isOther?: boolean;
  artAddress: string;
  isOtherPlatform: boolean;
  reload?: (option?: reloadOptions) => void;
}> = ({ isOther = false, artAddress, isOtherPlatform, reload }) => {
  const { address } = useAccount();
  const { data: collectionData, loading: collectionLoading } = useQuery<{
    total: number;
    list: INftItem[];
  }>({
    type: fetchCollection.toString(),
  });

  const productsClasses = useProductsStyles();
  const [page, setPage] = useState(DEFAULT_PAGE);
  const onPaginationChange = (event: ChangeEvent<unknown>, value: number) => {
    window.scrollTo(0, HEADER_HEIGHT_XL);
    setPage(value);
    const offset = value - 1;
    reload?.({ offset: offset === 0 ? 0 : offset * ITEMS_PORTION_COUNT });
  };
  const pagesCount = useMemo(() => {
    if (!collectionData) {
      return DEFAULT_PAGE;
    }
    const total = collectionData.total;
    const residue = total % ITEMS_PORTION_COUNT;
    return (total - residue) / ITEMS_PORTION_COUNT + (residue > 0 ? 1 : 0);
  }, [collectionData]);
  const renderedPagination = (
    <Pagination
      disabled={collectionLoading}
      page={page}
      count={pagesCount}
      onChange={onPaginationChange}
    />
  );

  const renderedBottomPagination = (
    <div className={productsClasses.paginationBottom}>{renderedPagination}</div>
  );

  return (
    <TabItemsComponent>
      <ProductCards isLoading={collectionLoading}>
        {collectionLoading ? (
          <ProductCardSkeleton />
        ) : (
          collectionData?.list?.map(item => (
            <NftItemCard
              key={uid(item)}
              reload={reload}
              item={item}
              isOther={isOther}
              tokenSymbol=""
              isTotalSupply={!Boolean(address && compare(artAddress, address))}
              hasAction={Boolean(
                artAddress && compare(artAddress, address ?? ZERO_ADDRESS),
              )}
            />
          ))
        )}
      </ProductCards>
      {!collectionLoading && collectionData?.list?.length === 0 && (
        <NoItems href={MarketRoutesConfig.Market.generatePath()} />
      )}

      {Boolean(collectionData?.total > ITEMS_PORTION_COUNT) &&
        isOtherPlatform &&
        renderedBottomPagination}
    </TabItemsComponent>
  );
};
