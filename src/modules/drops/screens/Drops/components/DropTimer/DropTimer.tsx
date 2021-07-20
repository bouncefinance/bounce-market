import { Typography } from '@material-ui/core';
import { useTimer } from 'modules/common/hooks/useTimer';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { useDropTimerStyles } from './useDropTimerStyles';

interface IDropTimerProps {
  endDate: Date;
}

export const DropTimer = ({ endDate }: IDropTimerProps) => {
  const classes = useDropTimerStyles();
  const { duration, timeRemaining, isTimeOver, endDetailedDate } = useTimer(
    endDate,
  );

  const getTimerValue = () => {
    if (isTimeOver) {
      return endDetailedDate;
    } else if (timeRemaining.days > 1) {
      return t('time.finished-on', { end: endDate });
    } else {
      return duration;
    }
  };

  return (
    <div className={classes.root}>
      <Typography component="span">{getTimerValue()}</Typography>
    </div>
  );
};
