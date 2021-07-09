import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import React from 'react';
import { PlayIcon } from './assets/PlayIcon';
import { useVideoStyles } from './useVideoStyles';

interface IVideoSkeletonProps {
  className?: string;
}

export const VideoSkeleton = ({ className }: IVideoSkeletonProps) => {
  const classes = useVideoStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <Skeleton
        variant="rect"
        height="auto"
        className={classNames(classes.absolute, classes.player)}
      />

      <div
        className={classNames(
          classes.absolute,
          classes.overlay,
          classes.overlayActive,
        )}
      >
        <PlayIcon className={classNames(classes.absolute, classes.playBtn)} />
      </div>
    </div>
  );
};
