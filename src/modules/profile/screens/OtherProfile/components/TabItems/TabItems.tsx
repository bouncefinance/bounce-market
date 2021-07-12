import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { RoutesConfiguration } from 'modules/createNFT/Routes';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { hasBrand, IItem } from 'modules/overview/api/getItems';
import { fetchAllNftByUser } from 'modules/profile/actions/fetchAllNftByUser';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uid } from 'react-uid';
import { AuctionState } from '../../../../../common/const/AuctionState';
import { FixedSwapState } from '../../../../../common/const/FixedSwapState';
import { PROFILE_INFO_REQUEST_KEY } from '../../OtherProfile';

const getIsOnSale = (item: IItem) => {
  return item.state === AuctionState.Live || item.state === FixedSwapState.Live;
};

interface ITabItemsProps {
  address: string;
}

export const TabItems = ({ address }: ITabItemsProps) => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const allNftByUserQuery = useQuery<IItem[] | null>({
    type: fetchAllNftByUser.toString(),
  });

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
    requestKey: PROFILE_INFO_REQUEST_KEY,
  });

  useEffect(() => {
    dispatchRequest(fetchAllNftByUser(address));

    return function reset() {
      dispatch(resetRequests([fetchAllNftByUser.toString()]));
    };
  }, [address, dispatch, dispatchRequest]);

  const itemsOnSale = allNftByUserQuery.data?.filter(getIsOnSale);

  const hasItems = !!itemsOnSale?.length;

  const username = profileInfo?.username ?? truncateWalletAddr(address);

  return hasItems || allNftByUserQuery.loading ? (
    <TabItemsComponent>
      <ProductCards isLoading={allNftByUserQuery.loading}>
        {itemsOnSale?.map((item: IItem) => (
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
            isOnSale
            copies={item.supply}
            MediaProps={{
              category: item.category,
              src: item.fileUrl,
              objectFit: 'contain',
              loading: 'lazy',
            }}
            profileInfo={
              <ProfileInfo
                subTitle="Owner"
                title={username}
                users={[
                  {
                    name: username,
                    avatar: profileInfo?.imgUrl,
                    verified: true,
                  },
                ]}
              />
            }
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
        ))}
      </ProductCards>
    </TabItemsComponent>
  ) : (
    <NoItems href={MarketRoutesConfig.Market.generatePath()} />
  );
};
