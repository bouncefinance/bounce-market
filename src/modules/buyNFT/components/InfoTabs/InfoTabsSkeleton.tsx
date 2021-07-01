import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import {Skeleton} from "@material-ui/lab";

const useInfoTabsSkeletonStyles = makeStyles<Theme>(theme => ({
  tabs: {
    display: "flex",
    flexFlow: "row nowrap",
    marginBottom: theme.spacig(2),

    "& > *": {
      width: "50px",
      height: "40px",
      marginRight: "20px"
    },
  },

  text: {
    "& > *": {
      marginBottom: "1rem"
    },
  }
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
