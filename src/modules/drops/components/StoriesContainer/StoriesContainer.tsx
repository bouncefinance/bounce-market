import { Container, ContainerProps } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { useStoriesContainerStyles } from './useStoriesContainerStyles';

interface IStoriesContainerProps extends ContainerProps {}

export const StoriesContainer = ({
  className,
  ...restProps
}: IStoriesContainerProps) => {
  const classes = useStoriesContainerStyles();

  return (
    <Container {...restProps} className={classNames(classes.root, className)} />
  );
};
