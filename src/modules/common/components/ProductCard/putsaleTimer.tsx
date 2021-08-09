import { Box, makeStyles, Theme } from '@material-ui/core';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import { useCount } from 'modules/common/hooks/useTimer';
import { t } from 'modules/i18n/utils/intl';
import { useEffect } from 'react';
import { useState } from 'react';
import { memo } from 'react';

const useStyles = makeStyles<Theme>(theme => ({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    background: 'rgba(0,0,0,0.5)',
    color: '#fff',
    zIndex: 2,
    pointerEvents: 'none',
  },
  tips: {
    fontSize: 14,
    opacity: 0.4,
    marginBottom: 7,
  },
  time: {
    fontSize: 18,
  },
}));

const toString = (n: number) => (n >= 10 ? n.toFixed(0) : '0' + n.toFixed(0));
const diffTime = (time: number | Date) => {
  try {
    const timer = differenceInSeconds(time, new Date());
    const H = Math.floor(timer / 3600);
    const m = Math.floor((timer - H * 3600) / 60);
    const s = Math.floor(timer - H * 3600 - m * 60);
    return `${toString(H)}h ${toString(m)}m ${toString(s)}s`;
  } catch (error) {
    return '0h 0m 0s';
  }
};

const CardPutSaleTimer: React.FC<{
  openAt: Date;
  onchange?: () => void;
}> = memo(({ openAt, onchange }) => {
  const classes = useStyles();
  const [timeValue, setTime] = useState('');
  const reload = useCount(1e3);
  const [isTimeOver, setIsTimeOver] = useState(false);
  useEffect(() => {
    if (+openAt < Date.now()) {
      setIsTimeOver(true);
      onchange?.();
      return () => {};
    }
    setTime(diffTime(openAt));
  }, [openAt, reload, onchange]);
  return isTimeOver ? (
    <></>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <div>
        <div className={classes.tips}>{t('product-card.pool-start-tips')}</div>
        <div className={classes.time}>{timeValue}</div>
      </div>
    </Box>
  );
});

export default CardPutSaleTimer;
