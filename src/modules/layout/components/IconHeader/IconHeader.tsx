import React from 'react';
import { Logo } from '../Logo';
import { useIconHeaderStyles } from './useIconHeaderStyles';
import { useIsSMDown } from 'modules/themes/useTheme';

export const IconHeader: React.FC = () => {
  const isSMDown = useIsSMDown();
  const classes = useIconHeaderStyles({ isSMDown });

  return (
    <div className={classes.root}>
      <Logo />
    </div>
  );
};
