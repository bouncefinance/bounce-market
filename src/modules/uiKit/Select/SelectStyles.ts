import { fade, makeStyles, Theme } from '@material-ui/core';

export const useSelectStyles = makeStyles<Theme>(theme => ({
  menuPaper: {
    border: '1px solid #E6E6E6',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 8,

    '& .MuiListItem-button': {
      fontSize: 'inherit',

      '&:hover': {
        background: fade(theme.palette.text.primary, 0.04),
      },

      '&.Mui-selected': {
        color: '#ccc',
        background: 'none',
        cursor: 'default',
      },
    },
  },
}));
