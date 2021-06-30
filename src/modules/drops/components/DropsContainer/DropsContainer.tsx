import { Container, ContainerProps } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { useDropsContainerStyles } from './useDropsContainerStyles';

interface IDropsContainerProps extends ContainerProps {}

export const DropsContainer = ({
  className,
  ...restProps
}: IDropsContainerProps) => {
  const classes = useDropsContainerStyles();

  return (
    <Container {...restProps} className={classNames(classes.root, className)} />
  );
};
