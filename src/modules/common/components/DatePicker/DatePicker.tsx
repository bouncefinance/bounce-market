import { memo, useState } from 'react';
import { getDaysInMonth } from 'date-fns';
import { useMemo } from 'react';
import { Box } from '@material-ui/core';
import { Select } from 'modules/uiKit/Select';
import { useDatePickerStyles } from './DatePickerStyles';
import { useEffect } from 'react';
import { t } from 'modules/i18n/utils/intl';
import { TimePicker } from './TimePicker';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const fixMonth = (n: number) => (n > 12 ? n - 12 : n);
const valueToSelectOptions = (label: number | string, value?: number) => ({
  value: value ?? label,
  label: label.toString(),
});
const YearShowNum = 5;
const MonthShowNum = 5;

export const DatePicker: React.FC<{
  onChange: (time: Date) => void;
  defaultYear?: number;
  defaultMonth?: number;
  defaultDay?: number;
  defaultHours?: number;
  defaultMinutes?: number;
}> = memo(
  ({
    onChange,
    defaultYear = new Date().getFullYear(),
    defaultDay = 1,
    defaultMonth = new Date().getMonth() + 1,
    defaultHours = 0,
    defaultMinutes = 0,
  }) => {
    const classes = useDatePickerStyles();
    const [year, setYear] = useState(defaultYear);
    const [month, setMonth] = useState(defaultMonth);
    const [day, setDay] = useState(defaultDay);
    const [hours, setHours] = useState(defaultHours);
    const [minutes, setMinutes] = useState(defaultMinutes);
    const timePickerValue = new Date(year, month - 1, day, hours, minutes);

    useEffect(() => {
      onChange(timePickerValue);
      // eslint-disable-next-line
    }, [year, month, day, hours, minutes]);

    const monthFormat = (m: number) => t('monthFormat', { month: fixMonth(m) });
    const YEARS = useMemo(
      () =>
        new Array(YearShowNum)
          .fill(defaultYear)
          .map((e, i) => valueToSelectOptions(e + i)),
      [defaultYear],
    );
    const MONTHS = useMemo(
      () =>
        new Array(MonthShowNum)
          .fill(defaultMonth)
          .map((e, i) =>
            valueToSelectOptions(monthFormat(fixMonth(e + i)), fixMonth(e + i)),
          ),
      [defaultMonth],
    );
    const MONTH_DAYS = useMemo(() => {
      return new Array(getDaysInMonth(new Date(year, month - 1)))
        .fill(0)
        .map((_, i) => valueToSelectOptions(i + 1));
    }, [year, month]);

    useEffect(() => {
      const monthDays = getDaysInMonth(new Date(year, month - 1));
      if (day > monthDays) {
        setDay(1);
      }
    }, [year, month, day]);

    const onYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setYear(parseInt(event.target.value as string));
    };
    const onMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setMonth(parseInt(event.target.value as string));
    };
    const onMonthDayChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setDay(parseInt(event.target.value as string));
    };
    const onTimeChange = (time: Date) => {
      setHours(time.getHours());
      setMinutes(time.getMinutes());
    };

    return (
      <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Box display="flex" className={classes.selects}>
            <Select
              options={MONTH_DAYS}
              value={day}
              name={day.toString()}
              onChange={onMonthDayChange}
            ></Select>
            <Select
              options={MONTHS}
              value={month}
              name={month.toString()}
              onChange={onMonthChange}
            ></Select>
            <Select
              options={YEARS}
              value={year}
              name={year.toString()}
              onChange={onYearChange}
            ></Select>
          </Box>
          <TimePicker date={timePickerValue} onChange={onTimeChange} />
        </MuiPickersUtilsProvider>
      </>
    );
  },
);
