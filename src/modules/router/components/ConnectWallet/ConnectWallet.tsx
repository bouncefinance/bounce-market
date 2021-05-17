import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { useConnectWalletStyles } from './useConnectWalletStyles';
import { Button } from 'modules/uiKit/Button';
import { useAccount } from 'modules/account/hooks/useAccount';
import { Section } from 'modules/uiKit/Section';

export const ConnectWallet = () => {
  const classes = useConnectWalletStyles();

  const { handleConnect, loading } = useAccount();

  return (
    <Section className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h1" className={classes.caption}>
          {t('connect-wallet.placeholder.title')}
        </Typography>
        <Typography variant="body1" className={classes.text}>
          {t('connect-wallet.placeholder.description')}
        </Typography>
        <Button
          onClick={handleConnect}
          disabled={loading}
          className={classes.connectBtn}
        >
          {t('connect-wallet.placeholder.title')}
        </Button>
      </Container>
    </Section>
  );
};
