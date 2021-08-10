import { Grid } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import {
  IMyBrand,
  queryMyBrandItem,
} from 'modules/brand/actions/queryMyBrandItem';
import { BrandRoutesConfig } from 'modules/brand/BrandRoutes';
import { BrandCard } from 'modules/brand/components/BrandCard';
import { BrandEmptyCard } from 'modules/brand/components/BrandEmptyCard';
import { NoItems } from 'modules/common/components/NoItems';
import { t } from 'modules/i18n/utils/intl';
import { MarketRoutesConfig } from 'modules/market/Routes';
import {
  ProfileRoutesConfig,
  USER_CREATE_NFT_PROFILE,
} from 'modules/profile/ProfileRoutes';
import { uid } from 'react-uid';
import { useTabBrandStyles } from './useTabBrandsStyles';

export const TabBrands: React.FC<{ isOther?: boolean; address?: string }> = ({
  isOther = false,
  address = '',
}) => {
  const classes = useTabBrandStyles();
  const { data: brands, loading } = useQuery<IMyBrand[]>({
    type: queryMyBrandItem.toString(),
  });

  return (
    <>
      <Grid container spacing={4} className={classes.root}>
        {isOther || (
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <BrandEmptyCard />
          </Grid>
        )}
        {loading ? (
          <></>
        ) : (
          brands?.map(brand => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={uid(brand)}>
              <BrandCard
                withAddBtn
                href={
                  isOther
                    ? ProfileRoutesConfig.OtherProfile.generatePath(
                        address,
                        USER_CREATE_NFT_PROFILE,
                        brand.contract || undefined,
                        brand.id,
                      )
                    : ProfileRoutesConfig.UserProfile.generatePath(
                        USER_CREATE_NFT_PROFILE,
                        brand.contract || undefined,
                        brand.id,
                      )
                }
                addItemHref={
                  isOther
                    ? ''
                    : BrandRoutesConfig.CreateBrandItem.generatePath(brand.id)
                }
                title={brand.title}
                id={brand.id}
                itemsCount={brand.itemsCount}
                imgSrc={brand.imgSrc}
                nftType={brand.nftType}
              />
            </Grid>
          ))
        )}
      </Grid>
      {!loading && brands?.length === 0 && (
        <NoItems
          href={MarketRoutesConfig.Market.generatePath()}
          title={
            isOther
              ? t('profile.no-items.other-collection-title')
              : t('profile.no-items.collection-title')
          }
          descr={
            isOther
              ? t('profile.no-items.other-collection-description')
              : t('profile.no-items.collection-description')
          }
        />
      )}
    </>
  );
};
