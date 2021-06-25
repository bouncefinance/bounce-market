import { Chip, ChipProps } from '@material-ui/core';
import React from 'react';
import { LightningIcon } from './assets/LightningIcon';
import { useDropsChipStyles } from './useDropsChipStyles';

interface IDropsLabelsProps extends ChipProps {
  isLive?: boolean;
}

/**
 * The main api is here - [Chip API](https://material-ui.com/api/chip/)
 */
export const DropsChip = ({
  isLive,
  icon,
  ...restProps
}: IDropsLabelsProps) => {
  const classes = useDropsChipStyles();

  return (
    <Chip
      {...restProps}
      icon={isLive ? <LightningIcon /> : icon}
      classes={{
        root: classes.root,
        icon: classes.icon,
        label: classes.label,
      }}
    />
  );
};
