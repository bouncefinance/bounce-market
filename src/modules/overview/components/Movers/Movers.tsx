import { Container } from '@material-ui/core';
import classNames from 'classnames';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import React from 'react';
import { useMoversStyles } from './MoversStyles';

interface IMoversProps extends ISectionProps {}

export const MoversComponent = ({
  className,
  ...sectionProps
}: IMoversProps) => {
  const classes = useMoversStyles();

  return (
    <Section {...sectionProps} className={classNames(classes.root, className)}>
      <Container>Some text content</Container>
    </Section>
  );
};

export const Movers = () => {
  return <MoversComponent stackUp />;
};
