import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { RoutesConfiguration } from 'modules/createNFT/Routes';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { hasBrand, IItem } from 'modules/overview/api/getItems';
import { fetchAllNftByUser } from 'modules/profile/actions/fetchAllNftByUser';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import React, { useEffect } from 'react';
import { t } from 'modules/i18n/utils/intl';
import { uid } from 'react-uid';
import { AuctionState } from '../../../../../common/const/AuctionState';
import { FixedSwapState } from '../../../../../common/const/FixedSwapState';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';

export const TabItems = () => {
  const dispatch = useDispatchRequest();
  const { address } = useAccount();

  const allNftByUserQuery = useQuery<IItem[] | null>({
    type: fetchAllNftByUser.toString(),
  });

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
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
      <ProductCards isLoading={allNftByUserQuery.loading}>
        {allNftByUserQuery.data?.map((item: IItem) => (
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
              subTitle: t('product-card.owner'),
              title: `${
                profileInfo?.username ?? truncateWalletAddr(String(address))
              }`,
              isOwner: true,
              users: [
                {
                  name: 'name',
                  avatar: `${profileInfo?.imgUrl}`,
                  verified: true,
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
        ))}
      </ProductCards>
    </TabItemsComponent>
  ) : (
    <NoItems href={MarketRoutesConfig.Market.generatePath()} />
  );
};
