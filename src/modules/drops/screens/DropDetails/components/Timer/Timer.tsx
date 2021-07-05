import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useTimer } from 'modules/common/hooks/useTimer';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { useTimerStyles } from './useTimerStyles';

interface ITimerProps {
  endDate: Date;
  className?: string;
}

export const Timer = ({ endDate, className }: ITimerProps) => {
  const classes = useTimerStyles();
  const { duration, isTimeOver } = useTimer(endDate);

  const timerText = isTimeOver ? t('time.time-over') : duration;

  return (
    <div className={classNames(classes.root, className)}>
      <Typography component="span" className={classes.duration}>
        ⚡ {timerText}
      </Typography>

      {!isTimeOver && (
        <Typography
          component="span"
          color="textSecondary"
          className={classes.text}
        >
          until the Drop ends
        </Typography>
      )}
    </div>
  );
};
