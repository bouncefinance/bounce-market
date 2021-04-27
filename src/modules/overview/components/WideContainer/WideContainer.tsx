import { Container, ContainerProps } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { useWideContainerStyles } from './useWideContainerStyles';

interface IWideContainerProps extends ContainerProps {}

export const WideContainer = ({
  className,
  children,
  ...restProps
}: IWideContainerProps) => {
  const classes = useWideContainerStyles();

  return (
    <Container {...restProps} className={classNames(classes.root, className)}>
      {children}
    </Container>
  );
};
