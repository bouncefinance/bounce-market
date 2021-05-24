import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { useChangeWalletStyles } from './useChangeWalletStyles';
import { Button } from 'modules/uiKit/Button';
import { useAccount } from 'modules/account/hooks/useAccount';
import { Section } from 'modules/uiKit/Section';

const ENABLE_CONNECTION = false;

export const ChangeWallet = () => {
  const classes = useChangeWalletStyles();

  const { handleConnect, loading } = useAccount();

  return (
    <Section className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h1" className={classes.caption}>
          {t('change-wallet.title')}
        </Typography>
        <Typography variant="body1" className={classes.text}>
          {t('change-wallet.description')}
        </Typography>
        {ENABLE_CONNECTION && (
          <Button
            onClick={handleConnect}
            disabled={loading}
            className={classes.connectBtn}
          >
            {t('change-wallet.submit')}
          </Button>
        )}
      </Container>
    </Section>
  );
};
