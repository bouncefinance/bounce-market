import { useInterval } from 'modules/common/hooks/useInterval';
import { Milliseconds, Minutes } from 'modules/common/types/unit';
import { getTimeRemaining } from 'modules/common/utils/getTimeRemaining';
import { t } from 'modules/i18n/utils/intl';
import { useMemo, useState } from 'react';

const INTERVAL_BREAKPOINT: Minutes = 2; // minutes
const SHORT_STEP: Milliseconds = 1000; // when time left less than INTERVAL_BREAKPOINT
const NORMAL_STEP: Milliseconds = 1000 * 30;

export const useTimer = (endDate: Date) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(endDate));

  const delayInterval = useMemo(() => {
    if (timeRemaining.minutes >= INTERVAL_BREAKPOINT) {
      return NORMAL_STEP;
    }

    if (timeRemaining.total > 0) {
      return SHORT_STEP;
    }

    return null;
  }, [timeRemaining.minutes, timeRemaining.total]);

  useInterval(() => {
    if (!endDate) return;
    setTimeRemaining(getTimeRemaining(endDate));
  }, delayInterval);

  const isTimeOver = timeRemaining.total <= 0;

  const duration = t('time.time-left-short', {
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
  });

  return { timeRemaining, duration, isTimeOver };
};
