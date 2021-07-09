import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { auctionTypeMap } from 'modules/api/common/poolType';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { AccountInfo } from 'modules/common/components/AccountInfo';
import { NoItems } from 'modules/common/components/NoItems';
import {
  ProductCard,
  ProductCardCategoryType,
} from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { MarketRoutesConfig } from 'modules/market/Routes';
import {
  ILikedItem,
  queryLikedItems,
} from 'modules/profile/actions/queryLikedItems';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import React, { useEffect } from 'react';
import { uid } from 'react-uid';

interface ITabLikedProps {
  className?: string;
}

export const TabLiked = ({ className }: ITabLikedProps) => {
  const dispatch = useDispatchRequest();

  const { data: likedItems, loading } = useQuery<ILikedItem[] | null>({
    type: queryLikedItems.toString(),
  });

  useEffect(() => {
    dispatch(queryLikedItems());
  }, [dispatch]);

  const hasItems = !!likedItems && likedItems.length > 0;

  return hasItems || loading ? (
    <TabItemsComponent>
      <ProductCards isLoading={loading}>
        {likedItems?.map(item => {
          const islikedItemWithFullData = !!item.itemName;
          if (!islikedItemWithFullData) {
            return null;
          }

          return (
            <ProductCard
              isOnSale
              id={item.itemId}
              poolId={item.poolId}
              auctionType={auctionTypeMap[`${item.poolType}`]}
              key={uid(item)}
              title={item.itemName}
              href={
                item.poolId && item.poolType
                  ? BuyNFTRoutesConfig.DetailsNFT.generatePath(
                      item.poolId,
                      auctionTypeMap[item.poolType],
                    )
                  : ''
              }
              likes={item.likes}
              price={item.price}
              MediaProps={{
                category: item.category as ProductCardCategoryType,
                src: item.imageUrl,
                objectFit: 'contain',
                loading: 'lazy',
              }}
              profileInfo={<AccountInfo address={item.accountAddress} />}
            />
          );
        })}
      </ProductCards>
    </TabItemsComponent>
  ) : (
    <NoItems href={MarketRoutesConfig.Market.generatePath()} />
  );
};
