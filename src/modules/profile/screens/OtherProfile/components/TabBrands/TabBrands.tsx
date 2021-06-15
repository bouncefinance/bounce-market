import { Grid } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import {
  IMyBrand,
  queryMyBrandItem,
} from 'modules/brand/actions/queryMyBrandItem';
import { BrandRoutesConfig } from 'modules/brand/BrandRoutes';
import { BrandCard } from 'modules/brand/components/BrandCard';
import { QueryLoadingCentered } from 'modules/common/components/QueryLoading/QueryLoading';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import React, { useEffect, useState } from 'react';
import { uid } from 'react-uid';
import { PROFILE_INFO_REQUEST_KEY } from '../../OtherProfile';
import { useTabBrandStyles } from './useTabBrandsStyles';

export const TabBrands = () => {
  const classes = useTabBrandStyles();
  const dispatch = useDispatchRequest();
  const [brands, setBrands] = useState<IMyBrand[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
    requestKey: PROFILE_INFO_REQUEST_KEY,
  });

  useEffect(() => {
    if (profileInfo) {
      setLoading(true);
      dispatch(queryMyBrandItem(profileInfo.accountAddress)).then(res => {
        const brands = res.data;
        if (brands) {
          setBrands(brands);
          setLoading(false);
        }
      });
    }
  }, [profileInfo, dispatch]);

  if (loading) {
    return <QueryLoadingCentered pt={4} />;
  }

  return (
    <Grid container spacing={4} className={classes.root}>
      {brands
        .filter(brand => brand.itemsCount)
        .map(brandProps => (
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
