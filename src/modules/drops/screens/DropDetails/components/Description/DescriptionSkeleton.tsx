import { Box, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { DropsOwnerSkeleton } from 'modules/drops/components/DropsOwner';
import React from 'react';
import { useDescriptionStyles } from './useDescriptionStyles';

export const DescriptionSkeleton = () => {
  const classes = useDescriptionStyles();

  return (
    <Grid container spacing={4} alignItems="flex-start">
      <Grid item xs={12} lg xl={6} className={classes.infoCol}>
        <Box mb={2.5}>
          {/* timer */}
          <Skeleton width={230} />
        </Box>

        <Typography variant="h1" component="div" className={classes.title}>
          {/* title */}
          <Skeleton width="80%" />
        </Typography>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md="auto">
            <DropsOwnerSkeleton />
          </Grid>

          <Grid item className={classes.socCol}>
            {/* socials */}
            <Grid container spacing={2}>
              <Grid item>
                <Skeleton variant="circle" width={44} height={44} />
              </Grid>
              <Grid item>
                <Skeleton variant="circle" width={44} height={44} />
              </Grid>
              <Grid item>
                <Skeleton variant="circle" width={44} height={44} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            {/* share btn */}
            <Skeleton width={110} height={50} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} lg xl={5}>
        {/* text */}
        <Box mb={1}>
          <Skeleton width="100%" />
        </Box>
        <Box mb={1}>
          <Skeleton width="100%" />
        </Box>
        <Box mb={1}>
          <Skeleton width="100%" />
        </Box>
        <Skeleton width="30%" />
      </Grid>
    </Grid>
  );
};
