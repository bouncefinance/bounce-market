import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import React from 'react';
import { useStoriesOwnerStyles } from './useStoriesOwnerStyles';

interface IStoriesOwnerSkeletonProps {
  className?: string;
}

export const StoriesOwnerSkeleton = ({
  className,
}: IStoriesOwnerSkeletonProps) => {
  const classes = useStoriesOwnerStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.avatarBox}>
        <Skeleton className={classes.avatar} variant="circle" />
      </div>

      <Typography className={classes.title}>
        <Skeleton width={90} className={classes.titleThumb} />
      </Typography>
    </div>
  );
};
