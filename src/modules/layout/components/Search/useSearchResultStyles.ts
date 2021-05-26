import { makeStyles, Theme } from '@material-ui/core';

export const useSearchResultStyles = makeStyles<Theme>(theme => ({
  root: {},
  empty: {
    textAlign: 'center',
  },
  group: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
    color: theme.palette.common.black,
    marginBottom: theme.spacing(2),
    '&:last-child': {
      marginBottom: 0,
    },
  },
  title: {
    fontSize: 15,
    fontWeight: 700,
    padding: theme.spacing(0, 3),
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(1, 3),
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: theme.palette.grey['300'],
    },
  },
  preview: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: theme.palette.grey['300'],
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  item: {
    fontSize: 15,
    fontWeight: 500,
  },
  name: {},
  price: {
    fontSize: 15,
    fontWeight: 700,
  },
}));
