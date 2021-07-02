import { makeStyles, Theme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

const useInfoTabsSkeletonStyles = makeStyles<Theme>(theme => ({
  tabs: {
    display: 'flex',
    flexFlow: 'row nowrap',
    marginBottom: theme.spacing(2),

    '& > *': {
      width: 50,
      height: 40,
      marginRight: 20,
    },
  },

  text: {
    '& > *': {
      marginBottom: '1rem',
    },
  },
}));

export const InfoTabsSkeleton = () => {
  const styles = useInfoTabsSkeletonStyles();

  return (
    <div>
      <div className={styles.tabs}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>

      <div className={styles.text}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    </div>
  );
};
