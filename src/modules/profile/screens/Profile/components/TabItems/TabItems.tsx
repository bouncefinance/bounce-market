import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { Queries } from 'modules/common/components/Queries/Queries';
import { RoutesConfiguration } from 'modules/createNFT/Routes';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { hasBrand, IItem } from 'modules/overview/api/getItems';
import { fetchAllNftByUser } from 'modules/profile/actions/fetchAllNftByUser';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import React, { useEffect } from 'react';
import { uid } from 'react-uid';
import { AuctionState } from '../../../../../common/const/AuctionState';
import { ResponseData } from '../../../../../common/types/ResponseData';
import { FixedSwapState } from '../../../../../common/const/FixedSwapState';
import { IAccountInfo, queryAccountInfo } from 'modules/common/actions/queryAccountInfo';

export const TabItems = () => {
  const dispatch = useDispatchRequest();
  const { address } = useAccount();

  const allNftByUserQuery = useQuery<IItem[] | null>({
    type: fetchAllNftByUser.toString(),
  });

  const { data: accountInfo } = useQuery<IAccountInfo | null>({
    type: queryAccountInfo.toString(),
  })
  console.log(allNftByUserQuery.data)
  console.log(accountInfo)

  useEffect(() => {
    if (address) {
      dispatch(
        fetchAllNftByUser({
          user: address,
        }),
      );

      dispatch(
        queryAccountInfo(address)
      )
    }
  }, [address, dispatch]);

  const hasItems =
    !!allNftByUserQuery.data && allNftByUserQuery.data.length > 0;

  return hasItems || allNftByUserQuery.loading ? (  
    <TabItemsComponent>
      <Queries<ResponseData<typeof fetchAllNftByUser>>
        requestActions={[fetchAllNftByUser]}
      >
        {({ data }) => (
          <ProductCards>
            {data?.map((item: IItem) => {
              return (
                <ProductCard
                  id={item.id}
                  poolId={item.poolId || 0}
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
                  // status={item.status}
                  // UPDATE price
                  price={item.poolId ? item.price : undefined}
                  priceType="BNB"
                  isOnSale={
                    item.state === AuctionState.Live ||
                    item.state === FixedSwapState.Live
                  }
                  copies={item.supply}
                  MediaProps={{
                    category: item.category,
                    src: item.fileUrl,
                    objectFit: 'contain',
                    loading: 'lazy',
                  }}
                  ProfileInfoProps={{
                    subTitle: 'Owner',
                    title: `${accountInfo?.username}`,
                    users: [
                      {
                        name: 'name',
                        avatar: `${accountInfo?.imgurl}`,
                      },
                    ],
                  }}
                  toSale={
                    hasBrand(item)
                      ? RoutesConfiguration.PublishNft.generatePath(
                          item.contractAddress,
                          item.id,
                        )
                      : RoutesConfiguration.PublishNft.generatePath(
                          item.contractAddress,
                          item.id,
                        )
                  }
                />
              );
            })}
          </ProductCards>
        )}
      </Queries>
    </TabItemsComponent>
  ) : (
    <NoItems href={MarketRoutesConfig.Market.generatePath()} />
  );
};
