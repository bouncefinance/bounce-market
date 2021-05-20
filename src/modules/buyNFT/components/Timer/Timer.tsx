import { Box, BoxProps } from '@material-ui/core';
import classNames from 'classnames';
import { TimeIcon } from 'modules/common/components/Icons/TimeIcon';
import { useInterval } from 'modules/common/hooks/useInterval';
import { getTimeRemaining } from 'modules/common/utils/getTimeRemaining';
import { useMemo, useState } from 'react';
import { useTimerStyles } from './useTimerStyles';
import { t } from '../../../i18n/utils/intl';
import { Milliseconds, Minutes } from '../../../common/types/unit';

const INTERVAL_BREAKPOINT: Minutes = 2; // minutes
const SHORT_STEP: Milliseconds = 1000; // when time left less than INTERVAL_BREAKPOINT
const NORMAL_STEP: Milliseconds = 1000 * 30;

interface ITimerProps extends BoxProps {
  endDate: Date;
}

export const Timer = ({ endDate, className, ...boxProps }: ITimerProps) => {
  const classes = useTimerStyles();

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(endDate));

  const delayInterval = useMemo(() => {
    return timeRemaining.minutes >= INTERVAL_BREAKPOINT
      ? NORMAL_STEP
      : timeRemaining.total > 0
      ? SHORT_STEP
      : null;
  }, [timeRemaining.minutes, timeRemaining.total]);

  useInterval(() => {
    setTimeRemaining(getTimeRemaining(endDate));
  }, delayInterval);

  return (
    <Box {...boxProps} className={classNames(classes.root, className)}>
      <TimeIcon className={classes.icon} />
      {timeRemaining.total > 0
        ? t('time.time-left-short', {
            days:
              timeRemaining.days !== 0 &&
              t('time.days-short', {
                days: timeRemaining.days,
              }),
            hours:
              timeRemaining.hours !== 0 &&
              t('time.hours-short', {
                hours: timeRemaining.hours,
              }),
            minutes:
              timeRemaining.minutes !== 0 &&
              t('time.minutes-short', {
                minutes: timeRemaining.minutes,
              }),
            seconds:
              timeRemaining.minutes < INTERVAL_BREAKPOINT &&
              timeRemaining.seconds !== 0 &&
              t('time.seconds-short', {
                seconds: timeRemaining.seconds,
              }),
          })
        : t('time.time-over')}
    </Box>
  );
};
