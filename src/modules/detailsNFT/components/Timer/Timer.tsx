import { Box, BoxProps } from '@material-ui/core';
import classNames from 'classnames';
import { TimeIcon } from 'modules/common/components/Icons/TimeIcon';
import { useInterval } from 'modules/common/hooks/useInterval';
import { getTimeRemaining } from 'modules/common/utils/getTimeRemaining';
import { useState } from 'react';
import { useTimerStyles } from './useTimerStyles';

const ONE_MINUTE = 1000 * 60;

interface ITimerProps extends BoxProps {
  endDate: Date;
}

export const Timer = ({ endDate, className, ...boxProps }: ITimerProps) => {
  const classes = useTimerStyles();
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(endDate));

  useInterval(() => {
    setTimeRemaining(getTimeRemaining(endDate));
  }, ONE_MINUTE);

  return (
    <Box {...boxProps} className={classNames(classes.root, className)}>
      <TimeIcon className={classes.icon} />
      {timeRemaining.hours > 0 && `${timeRemaining.hours}h`}{' '}
      {timeRemaining.minutes}m left
    </Box>
  );
};
