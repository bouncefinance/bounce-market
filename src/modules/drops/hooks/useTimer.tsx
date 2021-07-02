import { differenceInMilliseconds } from 'date-fns';
import { useInterval } from 'modules/common/hooks/useInterval';
import { useState } from 'react';

const ONE_SECOND = 1000;

export const convertToDuration = (start: Date, finish: Date) => {
  // todo: make the relevant drop timer calculation
  // https://fangible.atlassian.net/browse/FAN-347
  return new Date(differenceInMilliseconds(finish, start))
    .toISOString()
    .substr(11, 8);
};

interface IUseTimerProps {
  endDate: Date;
}

export const useTimer = ({ endDate }: IUseTimerProps) => {
  const [duration, setDuration] = useState(
    convertToDuration(new Date(), endDate),
  );

  useInterval(() => {
    setDuration(convertToDuration(new Date(), endDate));
  }, ONE_SECOND);

  return { duration };
};
