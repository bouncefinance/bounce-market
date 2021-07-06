import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useDropsOwnerStyles } from './useDropsOwnerStyles';

export const DropsOwnerSkeleton = () => {
  const classes = useDropsOwnerStyles();

  return (
    <div className={classes.root}>
      <div className={classes.avatarBox}>
        <Skeleton className={classes.avatar} variant="circle" />
      </div>

      <Typography className={classes.title}>
        <Skeleton width={90} />
      </Typography>
    </div>
  );
};
