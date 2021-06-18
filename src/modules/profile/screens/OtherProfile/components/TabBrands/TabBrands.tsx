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
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uid } from 'react-uid';
import { PROFILE_INFO_REQUEST_KEY } from '../../OtherProfile';
import { useTabBrandStyles } from './useTabBrandsStyles';

const requestKey = '/otherProfile';

export const TabBrands = () => {
  const classes = useTabBrandStyles();
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
    requestKey: PROFILE_INFO_REQUEST_KEY,
  });

  const { data: brands, loading } = useQuery<IMyBrand[] | null>({
    type: queryMyBrandItem.toString(),
    requestKey,
  });

  useEffect(() => {
    if (!profileInfo) {
      return;
    }
    dispatchRequest(
      queryMyBrandItem(profileInfo.accountAddress, {
        requestKey,
        asMutation: false,
      }),
    );
  }, [profileInfo, dispatchRequest]);

  useEffect(
    () =>
      function reset() {
        dispatch(
          resetRequests([
            {
              requestType: queryMyBrandItem.toString(),
              requestKey,
            },
          ]),
        );
      },
    [dispatch],
  );

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
