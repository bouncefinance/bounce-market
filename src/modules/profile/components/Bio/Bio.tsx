import { Box, Typography } from '@material-ui/core';
// import { t } from 'modules/i18n/utils/intl';
import React, { ReactNode } from 'react';
import { useBioStyles } from './useBioStyles';

interface IBioProps {
  children?: ReactNode;
}

export const Bio = ({ children }: IBioProps) => {
  const classes = useBioStyles();

  return (
    <>
      {/* <Box mb={2}>
        <Typography variant="h4">{t('profile.bio')}</Typography>
      </Box> */}

      <Box mb={9}>
        <Typography className={classes.bioDescr}>{children}</Typography>
      </Box>
    </>
  );
};
