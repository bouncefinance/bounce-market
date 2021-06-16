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
import { uid } from 'react-uid';
import { AuctionState } from '../../../../../common/const/AuctionState';
import { FixedSwapState } from '../../../../../common/const/FixedSwapState';
import { PROFILE_INFO_REQUEST_KEY } from '../../OtherProfile';

const getIsOnSale = (item: IItem) => {
  return item.state === AuctionState.Live || item.state === FixedSwapState.Live;
};

export const TabItems = () => {
  const dispatch = useDispatchRequest();

  const allNftByUserQuery = useQuery<IItem[] | null>({
    type: fetchAllNftByUser.toString(),
  });

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
    requestKey: PROFILE_INFO_REQUEST_KEY,
  });

  useEffect(() => {
    if (profileInfo?.accountAddress) {
      dispatch(
        fetchAllNftByUser({
          user: profileInfo.accountAddress,
        }),
      );
    }
  }, [dispatch, profileInfo]);

  const hasItems =
    !!allNftByUserQuery.data && allNftByUserQuery.data.length > 0;

  const username = profileInfo
    ? profileInfo.username ?? truncateWalletAddr(profileInfo.accountAddress)
    : 'Unnamed';

  return hasItems || allNftByUserQuery.loading ? (
    <TabItemsComponent>
      <ProductCards isLoading={allNftByUserQuery.loading}>
        {allNftByUserQuery.data?.filter(getIsOnSale).map((item: IItem) => (
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
