import { Box, BoxProps } from '@material-ui/core';
import classNames from 'classnames';
import { useTimer } from './useTimer';
import { t } from '../../../../i18n/utils/intl';
import { useTimerStyles } from './useTimerStyles';
import { useNftCardTimer } from 'modules/common/hooks/useTimer';

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

  if (isTimeOver) {
    return <></>;
  }
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

export const NftCardTimer = ({
  endDate,
  showTimeIcon = true,
  className,
  ...boxProps
}: ITimerProps) => {
  const classes = useTimerStyles();
  const { duration, isTimeOver } = useNftCardTimer({ endDate });

  if (isTimeOver) {
    return <></>;
  }
  return (
    <Box {...boxProps} className={classNames(classes.root2, className)}>
      <div className={classes.timeLeft2}>
        <span>🔥 </span>
        <span className={classes.timeLeftText}>{duration}</span>
      </div>
    </Box>
  );
};
