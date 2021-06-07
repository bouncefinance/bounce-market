import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const usePromoCardStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'minmax(100px, 50%) minmax(180px, 50%)',

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'minmax(100px, 60%) 360px',
      gap: theme.spacing(0, 7),
    },
  },

  content: {
    paddingRight: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },

  title: {
    display: 'block',
    position: 'relative',
    zIndex: 1,
    margin: theme.spacing(0, 0, 2.5),
    fontSize: 26,
    fontWeight: 500,
    color: 'inherit',

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2.5, 0, 2.5),
      fontSize: 52,
    },

    '&:hover': {
      color: 'inherit',
    },

    '& span': {
      whiteSpace: 'nowrap',
    },
  },

  text: {
    gridColumn: '1/3',
    marginTop: theme.spacing(3),
    color: fade(theme.palette.text.primary, 0.7),

    [theme.breakpoints.up('md')]: {
      marginTop: 0,
      gridColumn: 'auto',
    },

    '& span': {
      whiteSpace: 'nowrap',
    },
  },

  info: {
    display: 'grid',
    gap: theme.spacing(3, 2),
    marginTop: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(4.5),
      gridTemplateColumns: '1fr auto',
      alignItems: 'center',
    },
  },

  author: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: theme.spacing(0, 1.5),
  },

  avatar: {
    gridColumn: '1/1',
    gridRow: '1/3',
  },

  authorText: {
    gridColumn: '2/3',
    gridRow: '1/2',
  },

  authorName: {
    gridColumn: '2/3',
    gridRow: '2/3',
  },

  price: {
    fontWeight: 600,
  },

  imgWrap: {
    minWidth: 180,
    borderRadius: 12,
    overflow: 'hidden',
  },

  videoWrapper: {
    display: 'block',
    position: 'relative',
    backgroundPosition: 'center',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      paddingTop: '100%',
      display: 'block',
    },
    '&:after': {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      content: '""',
      position: 'absolute',
      transition: '0.2s',
    },
  },

  video: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
}));
