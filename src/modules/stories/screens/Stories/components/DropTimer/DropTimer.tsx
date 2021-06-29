import { Typography } from '@material-ui/core';
import { differenceInMilliseconds } from 'date-fns';
import { useInterval } from 'modules/common/hooks/useInterval';
import React, { useState } from 'react';
import { useDropTimerStyles } from './useDropTimerStyles';

const ONE_SECOND = 1000;

export const convertToDuration = (start: Date, finish: Date) => {
  return new Date(differenceInMilliseconds(finish, start))
    .toISOString()
    .substr(11, 8);
};

interface IDropTimerProps {
  endDate: Date;
}

export const DropTimer = ({ endDate }: IDropTimerProps) => {
  const classes = useDropTimerStyles();
  const [duration, setDuration] = useState(
    convertToDuration(new Date(), endDate),
  );

  useInterval(() => {
    setDuration(convertToDuration(new Date(), endDate));
  }, ONE_SECOND);

  return (
    <div className={classes.root}>
      <Typography component="span">{duration}</Typography>
    </div>
  );
};
