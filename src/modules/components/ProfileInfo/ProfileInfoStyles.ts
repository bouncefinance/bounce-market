import { makeStyles, Theme } from '@material-ui/core/styles';

export const useProfileInfoStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    gap: theme.spacing(0, 1.5),
  },

  avatars: {
    gridColumn: '1/2',
    gridRow: '1/3',

    display: 'flex',
  },

  avatarWrap: {
    position: 'relative',
    transition: 'transform 0.2s, opacity 0.2s',

    '$avatars:hover &': {
      opacity: 0.5,

      '&:hover': {
        opacity: 1,
      },
    },

    '&:hover': {
      transform: 'scale(1.3)',
      zIndex: 1,
    },

    '& + &': {
      marginLeft: -6,
    },
  },

  avatar: {
    width: 32,
    height: 32,
  },

  avatarCheck: {
    position: 'absolute',
    bottom: 0,
    right: -2,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: 'linear-gradient(270deg, #2663FF -33.33%, #FF3828 91.67%)',

    '&:before': {
      content: `''`,
      display: 'block',
      width: 8,
      height: 4,
      marginTop: -2,
      border: 'solid #fff',
      borderWidth: '0 0 2px 2px',
      transform: 'rotate(-45deg)',
    },
  },

  subTitle: {
    gridColumn: '2/3',
    gridRow: '1/2',
  },

  title: {
    gridColumn: '2/3',
    gridRow: '2/3',
  },
}));
