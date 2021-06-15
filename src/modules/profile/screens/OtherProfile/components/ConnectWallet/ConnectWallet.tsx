import { Container, Typography } from '@material-ui/core';
import { useAccount } from 'modules/account/hooks/useAccount';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { Section } from 'modules/uiKit/Section';
import React from 'react';
import { useConnectWalletStyles } from './useConnectWalletStyles';

interface IConnectWalletProps {
  className?: string;
}

export const ConnectWallet = ({ className }: IConnectWalletProps) => {
  const classes = useConnectWalletStyles();

  const { handleConnect, loading } = useAccount();

  return (
    <Section className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="body1" className={classes.descr}>
          {t('connect-wallet.placeholder.description')}
        </Typography>

        <Button onClick={handleConnect} disabled={loading}>
          {t('connect-wallet.placeholder.title')}
        </Button>
      </Container>
    </Section>
  );
};
