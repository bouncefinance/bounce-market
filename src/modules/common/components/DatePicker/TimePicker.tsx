import Box from '@material-ui/core/Box';
import { useDatePickerStyles } from './DatePickerStyles';
import classNames from 'classnames';
import { TimePicker as MTimePicker } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      50: '#000',
      100: '#000',
      200: '#000',
      300: '#000',
      400: '#000',
      500: '#000',
      600: '#000',
      700: '#000',
      800: '#000',
      900: '#000',
      A100: '#000',
      A200: '#000',
      A400: '#000',
      A700: '#000',
    },
  },
});
export const TimePicker: React.FC<{
  date?: Date;
  onChange?: (date: Date | null) => void;
}> = ({ date, onChange }) => {
  const classes = useDatePickerStyles();
  return (
    <>
      <ThemeProvider theme={defaultMaterialTheme}>
        <Box display="flex" justifyContent="center">
          <MTimePicker
            ampm={false}
            value={date}
            className={classNames(classes.timePicker, '')}
            onChange={d => {
              onChange?.(d);
            }}
          />
        </Box>
      </ThemeProvider>
    </>
  );
};
