import React from 'react';
import { Logo } from '../Logo';
import { useGiftHeaderStyles } from './useGiftHeaderStyles';

export const GiftHeader: React.FC = () => {
  const classes = useGiftHeaderStyles();

  return (
    <div className={classes.root}>
      <Logo />
    </div>
  );
};
