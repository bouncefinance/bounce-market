import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core';

export const useDatePickerStyles = makeStyles((theme: Theme) =>
  createStyles({
    selects: {
      '& > div': {
        marginRight: 19,
      },
      '& > div:last-child': {
        marginRight: 0,
      },
    },
    timePicker: {
      textAlign: 'center',
      borderBottom: '1px solid',
      marginTop: 47,
      marginBottom: 79,
      display: 'inline-block',
      width: 254,
      '& > div': {
        borderWidth: 0,
      },
      '& input': {
        lineHeight: '0.8em',
        fontSize: 100,
        fontWeight: 500,
        padding: 0,
      },
    },
  }),
);
