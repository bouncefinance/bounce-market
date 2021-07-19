import { useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { UserRoleEnum } from 'modules/common/actions/queryAccountInfo';
import { NoItems } from 'modules/common/components/NoItems';
import {
  ProductCard,
  ProductCardSkeleton,
} from 'modules/common/components/ProductCard';
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
import React from 'react';
import { uid } from 'react-uid';
import { AuctionState } from '../../../../../api/common/AuctionState';
import { FixedSwapState } from '../../../../../api/common/FixedSwapState';

export const TabItems = () => {
  const { address } = useAccount();

  const allNftByUserQuery = useQuery<IItem[] | null>({
    type: fetchAllNftByUser.toString(),
  });

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  const hasItems =
    !!allNftByUserQuery.data && allNftByUserQuery.data.length > 0;

  const username = profileInfo?.username ?? truncateWalletAddr(String(address));

  return hasItems || allNftByUserQuery.loading ? (
    <TabItemsComponent>
      <ProductCards isLoading={allNftByUserQuery.loading}>
        {allNftByUserQuery.data?.map((item: IItem) =>
          !item.isLoading ? (
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
              priceType={item.tokenSymbol}
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
              profileInfo={
                <>
                  <ProfileInfo
                    subTitle="Owner"
                    title={username}
                    users={[
                      {
                        name: username,
                        avatar: profileInfo?.imgUrl,
                        verified:
                          profileInfo?.identity === UserRoleEnum.Verified,
                      },
                    ]}
                  />
                </>
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
              isCancelTimePut={
                item.openAt ? +item.openAt >= +new Date() : false
              }
            />
          ) : (
            <ProductCardSkeleton key={uid(allNftByUserQuery.data?.length)} />
          ),
        )}
      </ProductCards>
    </TabItemsComponent>
  ) : (
    <NoItems href={MarketRoutesConfig.Market.generatePath()} />
  );
};
