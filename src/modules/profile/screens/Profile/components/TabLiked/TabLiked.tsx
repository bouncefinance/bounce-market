import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { Queries } from 'modules/common/components/Queries/Queries';
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
      <Queries<ILikedItem[]> requestActions={[queryLikedItems]}>
        {({ data }) => (
          <ProductCards>
            {data?.map(item => (
              <ProductCard
                isOnSale
                id={item.itemId}
                poolId={item.poolId}
                auctionType={item.poolType}
                key={uid(item)}
                title={item.itemName}
                href={
                  item.poolId && item.poolType
                    ? BuyNFTRoutesConfig.DetailsNFT.generatePath(
                        item.poolId,
                        item.poolType,
                      )
                    : ''
                }
                price={item.price}
                MediaProps={{
                  category: item.category,
                  src: item.imageUrl,
                  objectFit: 'contain',
                  loading: 'lazy',
                }}
                ProfileInfoProps={{
                  subTitle: 'Owner',
                  title: 'Owner name',
                  users: [
                    {
                      name: 'Owner name',
                    },
                  ],
                }}
              />
            ))}
          </ProductCards>
        )}
      </Queries>
    </TabItemsComponent>
  ) : (
    <NoItems href={MarketRoutesConfig.Market.generatePath()} />
  );
};
