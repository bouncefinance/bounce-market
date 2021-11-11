import React from 'react';
import { Logo } from '../Logo';
import { useGiftHeaderStyles } from './useGiftHeaderStyles';
import { useIsXSDown } from 'modules/themes/useTheme';

export const GiftHeader: React.FC = () => {
  const isXSDown = useIsXSDown();
  const props = { isXSDown };

  const classes = useGiftHeaderStyles(props);

  return (
    <div className={classes.root}>
      <Logo />
    </div>
  );
};
