import { makeStyles, Theme } from '@material-ui/core';

export const useRoyaltyDialogStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(5),

    [theme.breakpoints.up('md')]: {
      fontSize: 40,
    },
  },
  close: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 40,
    height: 40,
    padding: 0,
    color: theme.palette.text.primary,
    border: 'none',

    [theme.breakpoints.up('md')]: {
      top: 20,
      right: 20,
    },

    '&:hover': {
      border: 'none',
    },
  },

  adornedEnd: {
    paddingRight: 23,
    fontSize: 18,
  },

  inputNumber: {
    '& input': {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        textAlign: 'center',
      },
    },
  },

  royaltyRate: {
    display: 'flex',

    '& button': {
      marginTop: 40,
    },
  },
  input: {
    width: 200,
    marginRight: 8,
  },
  desc: {
    marginTop: -30,
    fontSize: 16,
  },
}));

export const useRoyaltyTable = makeStyles<Theme>(theme => ({
  empty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 300,
    fontSize: 24,
    color: 'rgba(0,0,0,.5)',
  },

  itemPreview: {
    width: 52,
    height: 52,
    marginRight: theme.spacing(2),
    borderRadius: 4,
    overflow: 'hidden',
  },

  tabs: {
    marginBottom: 25,
    position: 'relative',
    zIndex: 1,
  },

  tabsIndicator: {
    backgroundColor: '#000',
    borderRadius: 36,
    height: 36,
    bottom: 4,
    zIndex: -1,
  },

  tabRoot: {
    color: '#000',
    height: 36,
    minHeight: 'auto',
    padding: '0 30px',
    backgroundColor: '#F3F3F3',
    borderRadius: 36,
  },

  tabSelected: {
    background: 'none',
    '& span': {
      color: '#fff',
    },
  },

  tableItemIcon: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 240,
    '& .icon': {
      width: 52,
      height: 52,
      marginRight: 16,
      borderRadius: 4,
    },
    '& span': {
      flex: 1,
    },
  },

  tableItemVideo: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 240,
    '& span': {
      flex: 1,
    },
  },

  tableUserIcon: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 240,
    '& .avator': {
      width: 24,
      height: 24,
      marginRight: 8,
    },
    '& span': {
      flex: 1,
    },
  },

  emptyTitle: {
    marginBottom: theme.spacing(1.5),
  },

  emptyDescription: {
    margin: theme.spacing(0, 'auto', 3.5),
    maxWidth: 480,
  },

  ctime: {
    display: 'flex',
    alignItems: 'center',

    '& a': {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 4,
    },
  },
}));
