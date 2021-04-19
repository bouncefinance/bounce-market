import { Select as SelectComponent, SelectProps } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { AngleDownIcon } from 'modules/common/components/Icons/AngleDownIcon';
import React, { ReactNode, useMemo } from 'react';
import { uid } from 'react-uid';
import { useSelectStyles } from './SelectStyles';

export interface ISelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface ISelectProps extends Omit<SelectProps, 'variant'> {
  options?: ISelectOption[];
  children?: ReactNode;
}

export const Select = ({ children, options, ...restProps }: ISelectProps) => {
  const classes = useSelectStyles();

  const items = useMemo(() => {
    return options?.map(option => (
      <MenuItem
        disableRipple
        key={uid(option)}
        value={option.value}
        disabled={option.disabled}
      >
        {option.label}
      </MenuItem>
    ));
  }, [options]);

  const selectProps = useMemo(
    (): SelectProps => ({
      variant: 'outlined',
      MenuProps: {
        classes: {
          paper: classes.menuPaper,
        },
        elevation: 0,
        getContentAnchorEl: null,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
      },
      IconComponent: AngleDownIcon,
    }),
    [classes],
  );

  return (
    <SelectComponent {...selectProps} {...restProps}>
      {children || items}
    </SelectComponent>
  );
};
