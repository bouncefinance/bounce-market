import { Grid } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { queryMyBrandItem } from 'modules/brand/actions/queryMyBrandItem';
import { BrandRoutesConfig } from 'modules/brand/BrandRoutes';
import { BrandCard, IBrandCardProps } from 'modules/brand/components/BrandCard';
import { BrandEmptyCard } from 'modules/brand/components/BrandEmptyCard';
import React, { useEffect } from 'react';
import { uid } from 'react-uid';
import { useTabBrandStyles } from './useTabBrandsStyles';

export const TabBrands = () => {
  const classes = useTabBrandStyles();
  const dispatch = useDispatchRequest();
  const { address } = useAccount();

  const [brands, setBrands] = React.useState<any[]>([]);

  useEffect(() => {
    if (address) {
      dispatch(queryMyBrandItem(address)).then(res => {
        const brands = res.data;
        if (brands) {
          setBrands(brands);
        }
      });
    }
  }, [address, dispatch]);

  return (
    <Grid container spacing={4} className={classes.root}>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <BrandEmptyCard />
      </Grid>
      {brands.map((brandProps: IBrandCardProps) => (
        <Grid item xs={12} sm={6} lg={4} xl={3} key={uid(brandProps)}>
          <BrandCard
            withAddBtn
            href={BrandRoutesConfig.MyBrand.generatePath(brandProps.id)}
            addItemHref={BrandRoutesConfig.CreateBrandItem.generatePath(
              brandProps.id,
            )}
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
