import { TextField, TextFieldProps } from '@material-ui/core';
import React, { useCallback } from 'react';
import { FieldMetaState, FieldRenderProps } from 'react-final-form';
import { getErrorText } from '../../utils/getErrorText';
import { hasError } from '../../utils/hasError';
import { useInputFieldStyles } from './InputFieldStyles';

interface IFieldProps extends FieldRenderProps<string> {
  showlimitcounter: boolean;
}

export const InputField = ({
  input: { name, onChange, value, type,  },
  meta,
  showlimitcounter = false,
  ...rest
}: IFieldProps & TextFieldProps) => {
  const classes = useInputFieldStyles();

  const maxLength:number|null = rest.inputProps?.maxLength ?? null;

  const getHelperString = useCallback((value:string, meta:FieldMetaState<any>):string => {
    let helperTextString:string = getErrorText(meta);
    if (showlimitcounter && maxLength && !hasError(meta)) {
      helperTextString = `${value.length ?? 0}/${maxLength}`;
    }
    return helperTextString;
  }, [maxLength, showlimitcounter]);

  return (
    <TextField
      type={type}
      name={name}
      error={hasError(meta)}
      value={value}
      helperText={getHelperString(value, meta)}
      onChange={onChange}
      className={classes.root}
      {...rest}
    />
  );
};
