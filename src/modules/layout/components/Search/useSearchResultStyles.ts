import { makeStyles, Theme } from '@material-ui/core';

export const useSearchResultStyles = makeStyles<Theme>(theme => ({
  root: {
    marginRight: 1,
    maxHeight: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 10,
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.grey[200],
      borderRadius: 10,
      margin: theme.spacing(0.5, 0),
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.common.black,
      borderRadius: 10,
    },
  },
  empty: {
    padding: theme.spacing(3),
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
    padding: theme.spacing(2, 3, 1),
    backgroundColor: theme.palette.common.white,
    position: 'sticky',
    top: 0,
    zIndex: 20,
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
    minWidth: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: theme.palette.grey['300'],
  },
  avatar: {
    width: 50,
    minWidth: 50,
    height: 50,
    marginRight: 16,
  },
  item: {
    fontSize: 15,
    fontWeight: 500,
    maxWidth: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  name: {
    maxWidth: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  price: {
    fontSize: 15,
    fontWeight: 700,
  },
}));
