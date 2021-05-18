import { Grid } from '@material-ui/core';
import { BrandCard, IBrandCardProps } from 'modules/brand/components/BrandCard';
import React, { useEffect, useMemo, useState } from 'react';
import { uid } from 'react-uid';
import { BrandEmptyCard } from 'modules/brand/components/BrandEmptyCard';
import { useTabBrandStyles } from './useTabBrandsStyles';
import { useDispatchRequest } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { queryMyBrandItem } from 'modules/brand/actions/queryMyBrandItem';

export const TabBrands = () => {
  const classes = useTabBrandStyles();
  const dispatch = useDispatchRequest();
  const { address } = useAccount();
  const [brands, setBrands] = useState<IBrandCardProps[]>();

  useEffect(() => {
    if (address) {
    dispatch(queryMyBrandItem(address))
      .then(res => {
        setBrands(res.data);
      })
    }
  }, [address, dispatch])

  const renderedBrands = useMemo(
    () =>
      brands?.map((brandProps: IBrandCardProps) => (
        <Grid item xs={12} sm={6} lg={4} xl={3} key={uid(brandProps)}>
          <BrandCard
            title={brandProps.title}
            id={brandProps.id}
            itemsCount={brandProps.itemsCount}
            imgSrc={brandProps.imgSrc}
          />
        </Grid>
      )),
    [brands],
  );

  const renderEmpty = (
    <Grid item xs={12} sm={6} lg={4} xl={3}>
      <BrandEmptyCard />
    </Grid>
  );

  return (
    <>
      {brands && (
        <Grid container spacing={4} className={classes.root}>
          {renderedBrands}
          {brands.length === 0 && renderEmpty}
        </Grid>
      )}
    </>
  );
};
