import { Typography } from '@material-ui/core';
import { useTimer } from 'modules/drops/hooks/useTimer';
import React from 'react';
import { useDropTimerStyles } from './useDropTimerStyles';

interface IDropTimerProps {
  endDate: Date;
}

export const DropTimer = ({ endDate }: IDropTimerProps) => {
  const classes = useDropTimerStyles();
  const { duration } = useTimer({ endDate });

  return (
    <div className={classes.root}>
      <Typography component="span">{duration}</Typography>
    </div>
  );
};
