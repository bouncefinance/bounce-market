import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useStoriesOwnerStyles } from './useStoriesOwnerStyles';

export const StoriesOwnerSkeleton = () => {
  const classes = useStoriesOwnerStyles();

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
