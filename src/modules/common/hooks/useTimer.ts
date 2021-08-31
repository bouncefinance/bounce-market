import { useInterval } from 'modules/common/hooks/useInterval';
import { Milliseconds, Minutes } from 'modules/common/types/unit';
import { getTimeRemaining } from 'modules/common/utils/getTimeRemaining';
import { t } from 'modules/i18n/utils/intl';
import { useEffect, useMemo, useState } from 'react';
import differenceInSeconds from 'date-fns/differenceInSeconds';

const INTERVAL_BREAKPOINT: Minutes = 2; // minutes
const SHORT_STEP: Milliseconds = 1000; // when time left less than INTERVAL_BREAKPOINT
const NORMAL_STEP: Milliseconds = 1000 * 30;
const COUNT_DELAY = 3000;

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

  const modificationDate = (value: number): string => {
    return value < 10 ? `0${value}` : `${value}`;
  };
  // 'Ended on 01/07/2021'
  const endDetailedDate = t('time.time-end', {
    days: modificationDate(endDate.getDate()),
    months: modificationDate(endDate.getMonth() + 1),
    years: endDate.getFullYear(),
  });

  return { timeRemaining, duration, isTimeOver, endDetailedDate };
};

export const useCount = (delay = COUNT_DELAY) => {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount(currentCount => currentCount + 1);
  }, delay);
  return count;
};

const toTimeFixed = (n: number) =>
  n >= 10 ? n.toFixed(0) : '0' + n.toFixed(0);

interface IDiffTimeTopHours {
  h: string;
  m: string;
  s: string;
}

export const diffTimeTopHours = (
  time: number | Date,
  now = new Date(),
): IDiffTimeTopHours => {
  let result = { h: '00', m: '00', s: '00' };
  try {
    const timer = differenceInSeconds(time, new Date());
    const H = Math.floor(timer / 3600);
    const m = Math.floor((timer - H * 3600) / 60);
    const s = Math.floor(timer - H * 3600 - m * 60);
    return {
      h: toTimeFixed(H),
      m: toTimeFixed(m),
      s: toTimeFixed(s),
    };
  } catch (error) {
    return result;
  }
};

export const useNftCardTimer = ({
  endDate,
  onchange,
}: {
  endDate: Date;
  onchange?: () => void;
}) => {
  const [timeValue, setTime] = useState('');
  const reload = useCount(1e3);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const hmsFormat = ({ h, m, s }: IDiffTimeTopHours) =>
    t('time.time-left-short-hour', { hours: h, minutes: m, seconds: s });
  useEffect(() => {
    if (+endDate < Date.now()) {
      setIsTimeOver(true);
      onchange?.();
      return () => {};
    }
    setTime(hmsFormat(diffTimeTopHours(endDate)));
  }, [endDate, reload, onchange]);
  return {
    duration: timeValue,
    isTimeOver,
  };
};
