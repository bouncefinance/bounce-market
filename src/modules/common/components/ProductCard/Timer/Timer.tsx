import { Box, BoxProps } from '@material-ui/core';
import classNames from 'classnames';
import { useTimer } from './useTimer';
import { t } from '../../../../i18n/utils/intl';
import { useTimerStyles } from './useTimerStyles';

interface ITimerProps extends BoxProps {
  endDate: Date;
  showTimeIcon?: boolean;
}

export const Timer = ({
  endDate,
  showTimeIcon = true,
  className,
  ...boxProps
}: ITimerProps) => {
  const classes = useTimerStyles();
  const { duration, isTimeOver } = useTimer(endDate);

  return (
    <Box {...boxProps} className={classNames(classes.root, className)}>
      <span className={classes.tip}>
        {!isTimeOver && t('time.time-left-tip')}
      </span>
      <span className={classes.timeLeft}>
        {isTimeOver ? t('time.time-expired') : duration}
      </span>
    </Box>
  );
};
