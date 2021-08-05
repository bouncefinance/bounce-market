import { Box, makeStyles, Theme } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { memo } from 'react';
import { ReactComponent as LostIcon } from '../../assets/bids-lost.svg';

const useStyles = makeStyles<Theme>(theme => ({
  container: {
    position: 'absolute',
    bottom: 20,
    color: '#fff',
    zIndex: 2,
    textAlign: 'center',
    width: '100%',
  },
  type: {
    background: 'rgba(0,0,0,0.6)',
    fontSize: 13,
    padding: '7px 21px',
    borderRadius: 27,
    display: 'flex',
  },
  text: {
    marginLeft: 5,
  },
}));

export enum BidsType {
  LOST,
  WON,
  TOPBID,
  OUTBID,
}

const BidsState: React.FC<{
  type: BidsType;
}> = memo(({ type }) => {
  const classes = useStyles();

  const state: {
    [key in string]: { text: string; Icon: JSX.Element };
  } = {
    [BidsType.WON]: {
      Icon: <LostIcon />,
      text: t('product-card.won'),
    },
    [BidsType.LOST]: {
      Icon: <LostIcon />,
      text: t('product-card.lost'),
    },
    [BidsType.OUTBID]: {
      Icon: <LostIcon />,
      text: t('product-card.outbid'),
    },
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <div className={classes.type}>
        {state[type].Icon}
        <span className={classes.text}>{state[type].text}</span>
      </div>
    </Box>
  );
});

export default BidsState;
