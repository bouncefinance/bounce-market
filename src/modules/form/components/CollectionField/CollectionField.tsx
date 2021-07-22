import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';
import { FieldMetaState, FieldRenderProps } from 'react-final-form';
import { getErrorText } from '../../utils/getErrorText';
import { hasError } from '../../utils/hasError';
import { useCollectionFieldStyles } from './CollectionFieldStyleds';
import { t } from 'modules/i18n/utils/intl';

interface IFieldProps extends FieldRenderProps<string> {
  showLimitCounter: boolean;
}

const getHelperString = (
  value: string,
  meta: FieldMetaState<any>,
  maxLength: number | null,
  showLimitCounter: boolean,
): string => {
  let helperTextString: string = getErrorText(meta);
  if (showLimitCounter && maxLength && !hasError(meta)) {
    helperTextString = t('form.limit-counter', {
      value: value.length ?? 0,
      maxLimit: maxLength,
    });
  }
  return helperTextString;
};

export const CollectionField = ({
  input: { name, onChange, value, type, placeholder },
  meta,
  showLimitCounter = false,
  ...rest
}: IFieldProps & TextFieldProps) => {
  const classes = useCollectionFieldStyles();

  const maxLength: number | null = rest.inputProps?.maxLength ?? null;

  return (
    <TextField
      type={type}
      name={name}
      error={hasError(meta)}
      value={value}
      placeholder={placeholder}
      helperText={getHelperString(value, meta, maxLength, showLimitCounter)}
      onChange={onChange}
      className={classes.root}
      onWheel={(event: any) => event.target.blur()}
      {...rest}
    />
  );
};
