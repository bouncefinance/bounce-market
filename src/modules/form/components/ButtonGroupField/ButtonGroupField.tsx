import Button, { ButtonProps } from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { getErrorText } from '../../utils/getErrorText';
import { hasError } from '../../utils/hasError';
import { useButtonGroupFieldStyles } from './useButtonGroupFieldStyles';

type Value = string | number | boolean;

interface IButtonGroupItem {
  value: Value;
  label: string;
}

interface IButtonGroupFieldProps extends FieldRenderProps<HTMLElement> {
  items?: IButtonGroupItem[];
  fullWidth: boolean;
  MuiButtonProps?: ButtonProps;
}

export const ButtonGroupField = ({
  input: { onChange, onFocus, onBlur, value },
  meta,
  items = [],
  MuiButtonProps,
  fullWidth = false,
}: IButtonGroupFieldProps) => {
  const classes = useButtonGroupFieldStyles();

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
      const isActive = item.value === (value as any);

      const handleClick = () => {
        if (isActive) {
          return;
        }

        handleChange(item.value);
      };
      return (
        <Button
          key={item.value.toString()}
          size="large"
          {...MuiButtonProps}
          onClick={handleClick}
          variant="outlined"
          className={classNames(
            MuiButtonProps?.className,
            classes.btn,
            isActive && classes.btnActive,
          )}
        >
          {item.label}
        </Button>
      );
    },
    [MuiButtonProps, classes, handleChange, value],
  );

  const buttonGroupItems = useMemo(() => items.map(renderItem), [
    items,
    renderItem,
  ]);

  return (
    <>
      <div className={classNames(classes.root, fullWidth && classes.fullWidth)}>
        <div className={classes.list}>{buttonGroupItems}</div>
      </div>

      {hasError(meta) && (
        <FormHelperText error>{getErrorText(meta)}</FormHelperText>
      )}
    </>
  );
};
