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
  const { duration, timeRemaining } = useTimer(endDate);

  const formattedEndDate = t('time.finished-on', { end: endDate });

  return (
    <div className={classes.root}>
      <Typography component="span">
        {timeRemaining.days > 1 ? formattedEndDate : duration}
      </Typography>
    </div>
  );
};
