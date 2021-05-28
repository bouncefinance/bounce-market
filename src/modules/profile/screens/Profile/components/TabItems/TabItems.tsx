import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { Queries } from 'modules/common/components/Queries/Queries';
import { AuctionState } from 'modules/common/const/AuctionState';
import { PublishNFTType, RoutesConfiguration } from 'modules/createNFT/Routes';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { IItem } from 'modules/overview/api/getItems';
import { fetchAllNftByUser } from 'modules/profile/actions/fetchAllNftByUser';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import React, { useEffect } from 'react';
import { uid } from 'react-uid';

interface ITabItemsProps {
  className?: string;
}

export const TabItems = ({ className }: ITabItemsProps) => {
  const dispatch = useDispatchRequest();
  const { address } = useAccount();

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  const allNftByUserQuery = useQuery<IItem[] | null>({
    type: fetchAllNftByUser.toString(),
  });

  useEffect(() => {
    if (address) {
      dispatch(
        fetchAllNftByUser({
          user: address,
        }),
      );
    }
  }, [address, dispatch]);

  const hasItems =
    !!allNftByUserQuery.data && allNftByUserQuery.data.length > 0;

  return hasItems || allNftByUserQuery.loading ? (
    <TabItemsComponent>
      <Queries<IItem[]> requestActions={[fetchAllNftByUser]}>
        {({ data }) => (
          <ProductCards>
            {data?.map((item: IItem) => (
              <ProductCard
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
                // status={item.status}
                // UPDATE price
                price={item.poolId ? item.price : undefined}
                isOnSale={item.state === AuctionState.Live}
                copies={item.supply}
                MediaProps={{
                  category: item.category,
                  src: item.fileUrl,
                  objectFit: 'contain',
                  loading: 'lazy',
                }}
                ProfileInfoProps={{
                  subTitle: 'Owner',
                  title: `${profileInfo?.username ?? ''}`,
                  users: [
                    {
                      name: 'name',
                      avatar: profileInfo?.imgUrl,
                      verified: true,
                    },
                  ],
                }}
                toSale={
                  item.brandId === 10
                    ? RoutesConfiguration.PublishNft.generatePath(
                        PublishNFTType.NFT,
                        item.contractAddress,
                        item.id,
                      )
                    : RoutesConfiguration.PublishNft.generatePath(
                        PublishNFTType.BrandNFT,
                        item.contractAddress,
                        item.id,
                      )
                }
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
