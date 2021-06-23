import { Box} from '@material-ui/core';
import React from 'react';
import { usePromoCardStyles } from './PromoCardStyles';
import {Skeleton} from "@material-ui/lab";

export const PromoCardSkeleton = () => {
  const classes = usePromoCardStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Skeleton className={classes.title} variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <div className={classes.info}>
          <Box className={classes.author}>
            <Skeleton className={classes.avatar} variant="circle" width={"40px"} height={"40px"} />
            <Skeleton className={classes.authorText} variant="text" />
            <Skeleton className={classes.authorName} variant="text" />
          </Box>

          <Skeleton className={classes.price} variant="text" width={"50px"}/>
        </div>
      </div>

      <Box position="relative">
        <Skeleton className={classes.imgWrap} height={"360px"} variant="rect" />
      </Box>
    </div>
  );
};
