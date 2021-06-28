import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import React from 'react';
import { useTopCreatorsItemStyles } from './useTopCreatorsItemStyles';

export const TopCreatorsItemSkeleton = () => {
  const classes = useTopCreatorsItemStyles();

  return (
    <div className={classes.root}>
      <Skeleton
        variant="rect"
        height="auto"
        className={classNames(classes.imgWrap, classes.imgWrapThumb)}
      />

      <Typography className={classes.title}>
        <Box component={Skeleton} width="80%" mx="auto" />
      </Typography>
    </div>
  );
};
