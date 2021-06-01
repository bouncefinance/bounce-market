import React from 'react';
import { Container } from '@material-ui/core';
import { useChangeWalletStyles } from './useChangeWalletStyles';
import { Section } from 'modules/uiKit/Section';
import { WrongNetworkContent } from '../../../common/components/WrongNetworkContent';

export const ChangeWallet = () => {
  const classes = useChangeWalletStyles();

  return (
    <Section className={classes.root}>
      <Container maxWidth="sm">
        <WrongNetworkContent />
      </Container>
    </Section>
  );
};
