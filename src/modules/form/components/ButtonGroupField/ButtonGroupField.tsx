import React, { useCallback, useMemo } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { ButtonGroup } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { getErrorText } from '../../utils/getErrorText';
import { hasError } from '../../utils/hasError';

type Value = string | number | boolean;

interface IButtonGroupItem {
  value: Value;
  label: string;
}

interface IButtonGroupFieldProps extends FieldRenderProps<HTMLElement> {
  items?: IButtonGroupItem[];
  MuiButtonProps?: ButtonProps;
}

export const ButtonGroupField = ({
  input: { onChange, onFocus, onBlur, value },
  meta,
  items = [],
  MuiButtonProps,
}: IButtonGroupFieldProps) => {
  const handleChange = useCallback(
    (value: Value) => {
      onFocus();
      onBlur();
      onChange(value as any);
    },
    [onBlur, onChange, onFocus],
  );

  const renderItem = useCallback(
    (item: IButtonGroupItem) => {
      const handleClick = () => {
        handleChange(item.value);
      };
      return (
        <Button
          key={item.value.toString()}
          onClick={handleClick}
          variant={item.value === (value as any) ? 'contained' : 'outlined'}
          {...MuiButtonProps}
        >
          {item.label}
        </Button>
      );
    },
    [MuiButtonProps, handleChange, value],
  );

  const buttonGroupItems = useMemo(() => items.map(renderItem), [
    items,
    renderItem,
  ]);

  return (
    <>
      <ButtonGroup variant="contained" fullWidth={true}>
        {buttonGroupItems}
      </ButtonGroup>
      {hasError(meta) && (
        <FormHelperText error={true}>{getErrorText(meta)}</FormHelperText>
      )}
    </>
  );
};
