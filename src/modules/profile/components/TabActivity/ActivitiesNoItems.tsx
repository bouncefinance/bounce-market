import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { t } from '../../../i18n/utils/intl';
import { useTabActivityStyles } from './useTabActivityStyles';

export const ActivitiesNoItems = () => {
  const classes = useTabActivityStyles();

  return (
    <Box py={5} textAlign="center">
      <Typography variant="h2" className={classes.emptyTitle}>
        {t('profile.activity.empty-title')}
      </Typography>

      <Typography className={classes.emptyDescription}>
        {t('profile.activity.empty-description')}
      </Typography>
    </Box>
  );
};
