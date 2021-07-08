import { Box, Grid, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { useDescriptionStyles } from './useDescriptionStyles';

interface IDescriptionProps {
  title: string;
  text: string;
  creator: ReactNode;
  share: ReactNode;
  timer: ReactNode;
  social?: ReactNode;
}

export const DescriptionComponent = ({
  title,
  text,
  creator,
  share,
  timer,
  social,
}: IDescriptionProps) => {
  const classes = useDescriptionStyles();

  return (
    <Grid container spacing={4} alignItems="flex-start">
      <Grid item xs={12} lg xl={6} className={classes.infoCol}>
        <Box mb={2.5}>{timer}</Box>

        <Typography variant="h1" className={classes.title}>
          {title}
        </Typography>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md="auto">
            {creator}
          </Grid>

          {social && (
            <Grid item className={classes.socCol}>
              {social}
            </Grid>
          )}

          <Grid item>{share}</Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} lg xl={5}>
        <Typography>{text}</Typography>
      </Grid>
    </Grid>
  );
};
