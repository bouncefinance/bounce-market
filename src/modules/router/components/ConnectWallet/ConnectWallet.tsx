import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { useConnectWalletStyles } from './useConnectWalletStyles';
import { Button } from 'modules/uiKit/Button';
import { useAccount } from 'modules/account/hooks/useAccount';

export const ConnectWallet = () => {
  const classes = useConnectWalletStyles();

  const { handleConnect, loading } = useAccount();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Container maxWidth='sm'>
        <Typography variant='h1' className={classes.caption}>{t('connect-wallet.connect-your-wallet')}</Typography>
        <Typography variant='body1' className={classes.text}>{t('connect-wallet.page-content-unavailable-without-wallet')}</Typography>
        <Button
          onClick={handleConnect}
          disabled={loading}
          className={classes.connectBtn}
        >
          {t('connect-wallet.connect-your-wallet')}
        </Button>
      </Container>
    </Grid>
  );
};
