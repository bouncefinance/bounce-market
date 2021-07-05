import { compareAsc, formatDuration, intervalToDuration } from 'date-fns';
import { useInterval } from 'modules/common/hooks/useInterval';
import { useState } from 'react';

const ONE_SECOND = 1000;

// https://date-fns.org/v2.22.1/docs/compareDesc
// https://date-fns.org/v2.22.1/docs/intervalToDuration
// https://date-fns.org/v2.22.1/docs/formatDuration

const getIsTimeOver = (endDate: Date) => {
  return compareAsc(new Date(), endDate) > 0;
};

export const convertToDuration = (finish: Date): string => {
  // const duration = formatDistanceToNowStrict(finish);

  const rawDuration = intervalToDuration({
    start: new Date(),
    end: finish,
  });

  const duration = formatDuration(rawDuration, {
    format: ['hours', 'minutes', 'seconds'],
  });

  return duration;
};

interface IUseTimerProps {
  endDate: Date;
}

export const useTimerDepricated = ({ endDate }: IUseTimerProps) => {
  const [duration, setDuration] = useState<string>(convertToDuration(endDate));
  const [isTimeOver, setIsTimeOver] = useState(getIsTimeOver(endDate));

  useInterval(
    () => {
      setDuration(convertToDuration(endDate));
      setIsTimeOver(getIsTimeOver(endDate));
    },
    isTimeOver ? null : ONE_SECOND,
  );

  return {
    duration,
    isTimeOver,
  };
};
