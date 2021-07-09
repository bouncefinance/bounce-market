import { Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';

export const NothingFound = () => {
  return (
    <Typography variant="h3" align="center" color="textSecondary">
      {t('common.nothing-found')}
    </Typography>
  );
};
