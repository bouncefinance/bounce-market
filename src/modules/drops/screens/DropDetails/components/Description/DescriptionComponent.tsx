import { Box, Grid, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { useDescriptionStyles } from './useDescriptionStyles';

interface IDescriptionProps {
  title: string;
  text: string;
  creator: ReactNode;
  share: ReactNode;
}

export const DescriptionComponent = ({
  title,
  text,
  creator,
  share,
}: IDescriptionProps) => {
  const classes = useDescriptionStyles();

  return (
    <Grid container spacing={5}>
      <Grid item md xl={6}>
        <Box mb={3.5}>
          <Typography variant="h1">{title}</Typography>
        </Box>

        <Grid container spacing={5}>
          <Grid item>{creator}</Grid>

          <Grid item>{share}</Grid>
        </Grid>
      </Grid>

      <Grid item md xl={5}>
        <Typography>{text}</Typography>
      </Grid>
    </Grid>
  );
};
