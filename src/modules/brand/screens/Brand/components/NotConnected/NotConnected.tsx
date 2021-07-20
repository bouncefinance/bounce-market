import { Box, Typography } from '@material-ui/core';
import { useAccount } from 'modules/account/hooks/useAccount';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import React from 'react';

interface INotConnectedProps {
  className?: string;
}

export const NotConnected = ({ className }: INotConnectedProps) => {
  const { handleConnect, loading } = useAccount();

  return (
    <Box textAlign="center" mt={3}>
      <Typography>
        {t('connect-wallet.placeholder.collection-title')}
      </Typography>

      <Box mt={5}>
        <Button size="large" onClick={handleConnect} loading={loading}>
          {t('connect-wallet.placeholder.title')}
        </Button>
      </Box>
    </Box>
  );
};
