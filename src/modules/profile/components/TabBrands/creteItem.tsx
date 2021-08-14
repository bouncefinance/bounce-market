import { useQuery } from '@redux-requests/react';
import {
  ProductCard,
  ProductCardSkeleton,
} from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { GoBack } from 'modules/layout/components/GoBack';
import {
  fetchCollection,
  ICollectionData,
} from 'modules/profile/actions/fetchCollection';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NoItems } from 'modules/common/components/NoItems';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { uid } from 'react-uid';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { RoutesConfiguration } from 'modules/createNFT/Routes';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { UserRoleEnum } from 'modules/common/actions/queryAccountInfo';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { Button } from 'modules/uiKit/Button/Button';
import { useTabBrandStyles } from './useTabBrandsStyles';
import { AddFollowIcon } from '../TabFollowing/assets/AddFollowIcon';
import { t } from 'modules/i18n/utils/intl';
import { BrandRoutesConfig } from 'modules/brand/BrandRoutes';
import {
  ILikedItem,
  queryLikedItems,
} from 'modules/profile/actions/queryLikedItems';
import { useLikesMap } from 'modules/common/hooks/usePoolList';

export const CrateItemAll: React.FC<{ address: string; isOther?: boolean }> = ({
  address,
  isOther = false,
}) => {
  const { id: className, brand } = ProfileRoutesConfig.UserProfile.useParams();
  const dispatch = useDispatch();
  const classes = useTabBrandStyles();

  const {
    data: collectionData,
    loading: collectionLoading,
  } = useQuery<ICollectionData>({
    type: fetchCollection.toString(),
  });
  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });
  const isVerify =
    profileInfo && profileInfo?.identity === UserRoleEnum.Verified;

  useEffect(() => {
    if (!address) {
      return;
    }
    dispatch(
      fetchCollection({
        address,
        className,
      }),
    );
  }, [dispatch, address, className]);

  const { data: likes } = useQuery<ILikedItem[]>({
    type: queryLikedItems.toString(),
  });
  const { likesMap } = useLikesMap(likes ?? [], e =>
    e.poolId !== 0 ? '' : e.tokenid.toString(),
  );
  useEffect(() => {
    if (isOther) {
      dispatch(queryLikedItems());
    }
  }, [dispatch, isOther]);

  return (
    <TabItemsComponent>
      <div className={classes.headerGroup}>
        <GoBack />
        {isOther || (
          <Button
            variant="outlined"
            rounded
            className={classes.addNftBtn}
            href={BrandRoutesConfig.CreateBrandItem.generatePath(brand)}
          >
            <AddFollowIcon className={classes.addNftBtnIcon} />
            {t('collection.card.addNewItem')}
          </Button>
        )}
      </div>
      <div style={{ height: 20 }}></div>
      <ProductCards isLoading={collectionLoading}>
        {collectionLoading ? (
          <ProductCardSkeleton />
        ) : (
          collectionData?.map(item => (
            <ProductCard
              id={item.tokenid}
              poolId={item.tokenid || 0}
              isItemType
              likes={item.likecount}
              isLike={
                isOther ? likesMap?.get(item.tokenid.toString()) : item.isLike
              }
              key={uid(item)}
              title={item.itemname}
              href={BuyNFTRoutesConfig.Details_ITEM_NFT.generatePath(
                item.tokenid,
                item.contractaddress,
              )}
              priceType={item.itemsymbol}
              copies={item.supply}
              copiesBalance={item.balance}
              MediaProps={{
                category: item.category,
                src: item.fileurl || 'xxx',
                objectFit: 'contain',
                loading: 'lazy',
              }}
              contractAddress={item.contractaddress}
              standard={isOther ? undefined : item.standard}
              profileInfo={
                <ProfileInfo
                  subTitle="Creator"
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
              toSale={
                isOther
                  ? undefined
                  : RoutesConfiguration.PublishNft.generatePath(
                      item.contractaddress,
                      item.tokenid,
                    )
              }
            />
          ))
        )}
      </ProductCards>
      {!collectionLoading && collectionData?.length === 0 && (
        <NoItems href={MarketRoutesConfig.Market.generatePath()} />
      )}
    </TabItemsComponent>
  );
};
