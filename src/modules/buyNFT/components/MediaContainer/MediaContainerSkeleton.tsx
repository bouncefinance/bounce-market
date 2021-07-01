import {Box, Container, Grid} from '@material-ui/core';
import classNames from 'classnames';
import {GoBack} from 'modules/layout/components/GoBack';
import React from 'react';
import {useMediaContainerStyles} from './useMediaContainerStyles';
import {Skeleton} from "@material-ui/lab";

interface INFTContentProps {
  className?: string;
}

export const MediaContainerSkeleton = ({
  className,
}: INFTContentProps) => {
  const classes = useMediaContainerStyles();

  return (
    <Container className={classNames(classes.root, className)}>
      <Box mb={3}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs>
            <GoBack />
          </Grid>

          <Grid item>
            <Skeleton className={classes.btn} height={"36px"} variant="rect" />
          </Grid>
        </Grid>
      </Box>

      <div className={classes.content}>
        <Skeleton className={classes.img} variant="rect" width={"300px"} height={"300px"}/>
      </div>
    </Container>
  );
};
