import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useTimer } from 'modules/drops/hooks/useTimer';
import React from 'react';
import { useTimerStyles } from './useTimerStyles';

interface ITimerProps {
  endDate: Date;
  className?: string;
}

export const Timer = ({ endDate, className }: ITimerProps) => {
  const classes = useTimerStyles();
  const { duration } = useTimer({ endDate });

  return (
    <div className={classNames(classes.root, className)}>
      <Typography component="span" className={classes.duration}>
        ⚡ {duration}
      </Typography>

      <Typography
        component="span"
        color="textSecondary"
        className={classes.text}
      >
        until the Drop ends
      </Typography>
    </div>
  );
};
