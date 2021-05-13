import { IconButton, IconButtonProps } from '@material-ui/core';
import classNames from 'classnames';
import { CloseIcon } from 'modules/common/components/Icons/CloseIcon';
import React from 'react';
import { useModalCloseBtnStyles } from './useModalCloseBtnStyles';

interface IModalCloseBtnProps extends IconButtonProps {}

export const ModalCloseBtn = ({
  className,
  ...restProps
}: IModalCloseBtnProps) => {
  const classes = useModalCloseBtnStyles();

  return (
    <IconButton {...restProps} className={classNames(classes.root, className)}>
      <CloseIcon fontSize="large" />
    </IconButton>
  );
};
