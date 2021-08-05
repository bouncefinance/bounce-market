import { useQuery } from '@redux-requests/react';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { UserRoleEnum } from 'modules/common/actions/queryAccountInfo';
import { NoItems } from 'modules/common/components/NoItems';
import {
  ProductCard,
  ProductCardSkeleton,
} from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { RoutesConfiguration } from 'modules/createNFT/Routes';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { fetchOwned, IMyOwnedData } from 'modules/profile/actions/fetchOwned';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { uid } from 'react-uid';
import { t } from 'modules/i18n/utils/intl';

export const TabOwned = function () {
  const { data, loading } = useQuery<IMyOwnedData>({
    type: fetchOwned.toString(),
  });
  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });
  const isVerify =
    profileInfo && profileInfo?.identity === UserRoleEnum.Verified;

  return (
    <TabItemsComponent>
      <ProductCards isLoading={loading}>
        {loading ? (
          <ProductCardSkeleton />
        ) : (
          data?.map(item => (
            <ProductCard
              id={item.tokenid}
              poolId={item.tokenid || 0}
              isItemType
              key={uid(item)}
              title={item.itemname}
              href={BuyNFTRoutesConfig.Details_ITEM_NFT.generatePath(
                item.tokenid,
                item.contractaddress,
              )}
              priceType={item.itemsymbol}
              copies={item.supply}
              likes={item.likecount}
              isLike={item.isLike}
              copiesBalance={item.balance}
              MediaProps={{
                category: item.category,
                src: item.fileurl || 'xxx',
                objectFit: 'contain',
                loading: 'lazy',
              }}
              contractAddress={
                item.balance > 0 ? item.contractaddress : undefined
              }
              standard={item.standard}
              profileInfo={
                <ProfileInfo
                  subTitle={t('details-nft.role.minter')}
                  title={item.creatorname}
                  users={[
                    {
                      name: item.creatorname,
                      avatar: item.creatorimage,
                      href: ProfileRoutesConfig.OtherProfile.generatePath(
                        item.creatoraddress,
                      ),
                      verified: isVerify || false,
                    },
                  ]}
                />
              }
              toSale={RoutesConfiguration.PublishNft.generatePath(
                item.contractaddress,
                item.tokenid,
              )}
            />
          ))
        )}
      </ProductCards>
      {!loading && data?.length === 0 && (
        <NoItems
          href={MarketRoutesConfig.Market.generatePath()}
          title={t('profile.no-items.showCase-title')}
          descr={t('profile.no-items.showCase-description')}
        />
      )}
    </TabItemsComponent>
  );
};
