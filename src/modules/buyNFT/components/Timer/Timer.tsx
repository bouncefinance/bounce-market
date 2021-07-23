import { Box, BoxProps } from '@material-ui/core';
import classNames from 'classnames';
import { TimeIcon } from 'modules/common/components/Icons/TimeIcon';
import { useTimer } from 'modules/common/hooks/useTimer';
import { t } from '../../../i18n/utils/intl';
import { useTimerStyles } from './useTimerStyles';

interface ITimerProps extends BoxProps {
  endDate: Date;
}

export const Timer = ({ endDate, className, ...boxProps }: ITimerProps) => {
  const classes = useTimerStyles();
  const { duration, isTimeOver } = useTimer(endDate);

  return (
    <Box {...boxProps} className={classNames(classes.root, className)}>
      <TimeIcon className={classes.icon} />
      {isTimeOver ? t('time.time-expired') : duration}
    </Box>
  );
};
