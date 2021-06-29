import {Grid} from '@material-ui/core';
import React from 'react';
import {useInfoPricesStyles} from './useInfoPricesStyles';
import {Skeleton} from "@material-ui/lab";

export const InfoPricesSkeleton = () => {
  const classes = useInfoPricesStyles();

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} sm>
        <Skeleton className={classes.cryptoPrice} variant="text" />
        <Skeleton className={classes.price} variant="text" />
      </Grid>
    </Grid>
  );
};
