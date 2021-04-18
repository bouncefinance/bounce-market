import React from 'react';
import { Container } from '@material-ui/core';
import { GoBack } from '../../../layout/components/GoBack';
import { useCreateNFTStyles } from './useCreateNFTStyles';

export const CreateNFT = () => {
  const classes = useCreateNFTStyles();
  return (
    <Container maxWidth="lg" className={classes.root}>
      <GoBack />
    </Container>
  );
};
