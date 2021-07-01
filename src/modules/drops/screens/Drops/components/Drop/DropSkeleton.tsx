import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import { DropsOwnerSkeleton } from 'modules/drops/components/DropsOwner';
import React from 'react';
import { uid } from 'react-uid';
import { useDropStyles } from './useDropStyles';

export const DropSkeleton = () => {
  const classes = useDropStyles({});

  return (
    <div className={classes.root}>
      <div className={classes.bgImgBox}>
        <Skeleton
          style={{ borderRadius: 'inherit' }}
          width="100%"
          height="100%"
          variant="rect"
        />
      </div>

      {/* timer */}
      <Box mb={5}>
        <Box display="flex" justifyContent="center">
          <Skeleton width={120} height={42} variant="text" />
        </Box>
      </Box>

      {/* items */}
      <Box mb={4}>
        <div className={classes.nftList}>
          {[0, 0, 0].map((_, i) => (
            <div key={uid(i)} className={classes.nftItem}>
              <div
                className={classNames(
                  classes.itemImgBox,
                  classes.itemImgBoxThumb,
                )}
              >
                <Skeleton
                  className={classes.itemImgThumb}
                  width="100%"
                  height="100%"
                  variant="rect"
                />
              </div>
            </div>
          ))}
        </div>
      </Box>

      <Typography variant="h1" className={classes.title}>
        <Box display="flex" justifyContent="center">
          <Skeleton width="50%" />
        </Box>
      </Typography>

      <Typography component="div" className={classes.text}>
        <Box display="flex" justifyContent="center">
          <Skeleton width="80%" />
        </Box>
      </Typography>

      <div className={classes.creator}>
        <DropsOwnerSkeleton />
      </div>
    </div>
  );
};
