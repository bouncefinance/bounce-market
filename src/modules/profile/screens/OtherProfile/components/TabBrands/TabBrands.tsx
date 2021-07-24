import { Grid, Typography } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import {
  IMyBrand,
  queryMyBrandItem,
} from 'modules/brand/actions/queryMyBrandItem';
import { BrandRoutesConfig } from 'modules/brand/BrandRoutes';
import { BrandCard } from 'modules/brand/components/BrandCard';
import { QueryLoadingCentered } from 'modules/common/components/QueryLoading/QueryLoading';
import { t } from 'modules/i18n/utils/intl';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uid } from 'react-uid';
import { useTabBrandStyles } from './useTabBrandsStyles';

const requestKey = '/otherProfile';

interface ITabBrandsProps {
  address: string;
}

export const TabBrands = ({ address }: ITabBrandsProps) => {
  const classes = useTabBrandStyles();
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const { data: brands, loading } = useQuery<IMyBrand[] | null>({
    type: queryMyBrandItem.toString(),
    requestKey,
  });

  useEffect(() => {
    dispatchRequest(
      queryMyBrandItem(address, {
        requestKey,
        asMutation: false,
      }),
    );

    return function reset() {
      dispatch(
        resetRequests([
          {
            requestType: queryMyBrandItem.toString(),
            requestKey,
          },
        ]),
      );
    };
  }, [address, dispatch, dispatchRequest]);

  if (loading) {
    return <QueryLoadingCentered pt={4} />;
  }

  const brandsWithItems = brands && brands.filter(brand => brand.itemsCount);

  if (!brandsWithItems?.length) {
    return <Typography>{t('profile.no-items.title')}</Typography>;
  }

  return (
    <Grid container spacing={4} className={classes.root}>
      {brandsWithItems?.map(brandProps => (
        <Grid item xs={12} sm={6} lg={4} xl={3} key={uid(brandProps)}>
          <BrandCard
            nftType={brandProps.nftType}
            href={BrandRoutesConfig.Brand.generatePath(brandProps.id)}
            title={brandProps.title}
            id={brandProps.id}
            itemsCount={brandProps.itemsCount}
            imgSrc={brandProps.imgSrc}
          />
        </Grid>
      ))}
    </Grid>
  );
};
