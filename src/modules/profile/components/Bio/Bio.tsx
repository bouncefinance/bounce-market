import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useBioStyles } from './useBioStyles';

interface IBioProps {
  bio?: string;
}

export const Bio = ({ bio }: IBioProps) => {
  const classes = useBioStyles();

  return (
    <>
      <Box mb={9}>
        <Typography component="div" className={classes.bioDescr}>
          {bio?.split('\n')?.map((v, i, arr) => {
            return (
              <p
                key={i}
                style={{
                  marginTop: 0,
                  ...(i === arr.length - 1 ? { marginBottom: 0 } : {}),
                }}
              >
                {v}
              </p>
            );
          })}
        </Typography>
      </Box>
    </>
  );
};
