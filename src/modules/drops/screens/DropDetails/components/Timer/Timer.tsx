import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { DropType } from 'modules/api/getOneDropsDetail';
import { useTimer } from 'modules/common/hooks/useTimer';
import { t } from 'modules/i18n/utils/intl';
import { useTimerStyles } from './useTimerStyles';

interface ITimerProps {
  endDate: Date;
  className?: string;
  dropType: DropType;
}

export const Timer = ({ endDate, className, dropType }: ITimerProps) => {
  const classes = useTimerStyles();
  const { duration, isTimeOver, endDetailedDate } = useTimer(endDate);

  const timerText =
    dropType === DropType.Live
      ? t('drop-details.live')
      : isTimeOver
      ? endDetailedDate
      : duration;

  return (
    <div className={classNames(classes.root, className)}>
      <Typography component="span" className={classes.duration}>
        ⚡ {timerText}
      </Typography>

      {!isTimeOver && (
        <Typography
          component="span"
          color="textSecondary"
          className={classes.text}
        >
          {t('drop-details.timer-descr')}
        </Typography>
      )}
    </div>
  );
};
