import {Box, Grid} from '@material-ui/core';
import {useInfoDescrStyles} from './useInfoDescrStyles';
import {Skeleton} from "@material-ui/lab";
import React from "react";
import {ProfileInfoSkeleton} from "../../../common/components/ProfileInfo";

export const InfoDescrSkeleton = () => {
  const classes = useInfoDescrStyles();

  return (
    <>
      <Box mb={3}>
        <Skeleton className={classes.title} variant="text" />
      </Box>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <ProfileInfoSkeleton/>
        </Grid>

        <Grid item xs>
          <ProfileInfoSkeleton/>
        </Grid>

        <Grid item xs="auto">
            <Skeleton className={classes.copiesIcon} width={80} height={32} variant="rect"/>
        </Grid>

        <Grid item xs="auto">
            <Skeleton className={classes.copiesIcon} width={80} height={32} variant="rect"/>
        </Grid>
      </Grid>


      <Box component="hr" className={classes.hr} my={3.5}/>

      <Box className={classes.description}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Box>
    </>
  );
};
