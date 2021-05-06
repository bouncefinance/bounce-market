import MenuItem from '@material-ui/core/MenuItem';
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import { ISelectOption, Select } from 'modules/uiKit/Select';
import React, { useMemo } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { uid } from 'react-uid';
import { getErrorText } from '../../utils/getErrorText';
import { hasError } from '../../utils/hasError';

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
    <Select
      name={name}
      error={hasError(meta)}
      value={value}
      helperText={getErrorText(meta)}
      onChange={onChange as any}
      {...(rest as any)}
    >
      {items}
    </Select>
  );
};
