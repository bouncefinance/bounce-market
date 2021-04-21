import { fade, makeStyles, Theme } from '@material-ui/core';

export const useInfoDescrStyles = makeStyles<Theme>(theme => ({
  title: {
    fontSize: 28,
  },

  copies: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 1.75),
    borderRadius: 8,
    background: '#F3F3F3',
    fontSize: 13,
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },

  copiesIcon: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },

  hr: {
    border: `solid ${fade(theme.palette.text.primary, 0.1)}`,
    borderWidth: '1px 0 0',
  },

  description: {
    fontSize: 15,
  },

  textToggle: {
    height: 'auto',
    minWidth: 0,
    padding: theme.spacing(1, 0, 0),
    color: theme.palette.primary.main,
    transition: 'color 0.2s',

    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
}));
