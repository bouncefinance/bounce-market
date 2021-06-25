import { Chip, ChipProps } from '@material-ui/core';
import React from 'react';
import { LightningIcon } from './assets/LightningIcon';
import { useStoriesChipStyles } from './useStoriesChipStyles';

interface IStoriesLabelsProps extends ChipProps {
  isLive?: boolean;
}

/**
 * The main api is here - [Chip API](https://material-ui.com/api/chip/)
 */
export const StoriesChip = ({
  isLive,
  icon,
  ...restProps
}: IStoriesLabelsProps) => {
  const classes = useStoriesChipStyles();

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
