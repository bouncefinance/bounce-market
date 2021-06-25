import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { useStoriesSliderItemStyles } from './useStoriesSliderItemStyles';

interface IStoriesSliderItemSkeletonProps {
  className?: string;
  profileInfo: ReactNode;
}

export const StoriesSliderItemSkeleton = ({
  className,
  profileInfo,
}: IStoriesSliderItemSkeletonProps) => {
  const classes = useStoriesSliderItemStyles({});

  return (
    <div className={classNames(classes.root, className)}>
      <Skeleton
        className={classNames(classes.imgWrap, classes.imgWrapThumb)}
        variant="rect"
      />

      <div className={classes.content}>
        <div className={classes.contentWrap}>
          <Typography variant="h1" className={classes.title}>
            <Skeleton width="50%" className={classes.titleThumb} />
          </Typography>

          <Typography className={classes.text}>
            <Skeleton className={classes.textThumb} width="60%" />
          </Typography>

          <div className={classes.profileInfo}>{profileInfo}</div>
        </div>
      </div>
    </div>
  );
};
