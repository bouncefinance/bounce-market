import React from 'react';
import { Logo } from '../Logo';
import { useIconHeaderStyles } from './useIconHeaderStyles';
import { useIsXSDown } from 'modules/themes/useTheme';

export const IconHeader: React.FC = () => {
  const isXSDown = useIsXSDown();
  const classes = useIconHeaderStyles({ isXSDown });

  return (
    <div className={classes.root}>
      <Logo />
    </div>
  );
};
