import { Grid } from '@material-ui/core';
import { BrandCard, IBrandCardProps } from 'modules/brand/components/BrandCard';
import React, { useEffect } from 'react';
import { uid } from 'react-uid';
import { BrandEmptyCard } from 'modules/brand/components/BrandEmptyCard';
import { useTabBrandStyles } from './useTabBrandsStyles';
import { useDispatchRequest } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { queryMyBrandItem } from 'modules/brand/actions/queryMyBrandItem';
import { Queries } from '../../../common/components/Queries/Queries';
import { ResponseData } from '../../../common/types/ResponseData';

export const TabBrands = () => {
  const classes = useTabBrandStyles();
  const dispatch = useDispatchRequest();
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      dispatch(queryMyBrandItem(address));
    }
  }, [address, dispatch]);

  return (
    <Queries<ResponseData<typeof queryMyBrandItem>>
      requestActions={[queryMyBrandItem]}
      noDataMessage={
        <>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <BrandEmptyCard />
          </Grid>
        </>
      }
    >
      {({ data: brands }) => (
        <Grid container spacing={4} className={classes.root}>
          {brands?.map((brandProps: IBrandCardProps) => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={uid(brandProps)}>
              <BrandCard
                title={brandProps.title}
                id={brandProps.id}
                itemsCount={brandProps.itemsCount}
                imgSrc={brandProps.imgSrc}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Queries>
  );
};
