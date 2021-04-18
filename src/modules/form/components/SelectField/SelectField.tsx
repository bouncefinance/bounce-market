import React, { useMemo } from 'react';
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { uid } from 'react-uid';
import { FieldRenderProps } from 'react-final-form';
import { getErrorText } from '../../utils/getErrorText';
import { hasError } from '../../utils/hasError';

export interface ISelectOption {
  value: string;
  label: string;
}

interface ISelectComponent
  extends OutlinedTextFieldProps,
    FieldRenderProps<any> {
  options: ISelectOption[];
}

export const SelectField = ({
  input: { name, onChange, value },
  meta,
  options,
  ...rest
}: ISelectComponent) => {
  const items = useMemo(() => {
    return options.map(option => (
      <MenuItem key={uid(option)} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  }, [options]);

  return (
    <TextField
      name={name}
      error={hasError(meta)}
      value={value}
      helperText={getErrorText(meta)}
      select={true}
      onChange={onChange}
      {...rest}
    >
      {items}
    </TextField>
  );
};
