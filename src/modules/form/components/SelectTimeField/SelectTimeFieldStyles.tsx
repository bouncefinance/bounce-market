import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core';

export const useSelectTimeFieldStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
    title: {
      textAlign: 'center',
      marginBottom: theme.spacing(5),

      [theme.breakpoints.up('md')]: {
        fontSize: 40,
      },
    },
    selectTime: {
      pointerEvents: 'none',
      cursor: 'pointer',
    },
    selectTimeBox: {
      cursor: 'pointer',
      marginTop: 20,
    },
  }),
);
