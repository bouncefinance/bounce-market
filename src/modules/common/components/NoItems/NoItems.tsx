import { Box, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNoItemsStyles } from './useNoItemsStyles';

interface INoItemsProps {
  href?: string;
  onClick?: () => void;
}

export const NoItems = ({ href, onClick }: INoItemsProps) => {
  const classes = useNoItemsStyles();
  const withBtn = !!href || !!onClick;

  return (
    <Box py={5} textAlign="center">
      <Typography variant="h2" className={classes.title}>
        {t('profile.no-items.title')}
      </Typography>

      <Typography className={classes.descr}>
        {t('profile.no-items.descr')}
      </Typography>

      {withBtn && (
        <Button
          component={RouterLink}
          to={href}
          href={href}
          onClick={onClick}
          size="large"
        >
          {t('profile.no-items.btn')}
        </Button>
      )}
    </Box>
  );
};
