import React from 'react';
import { useDefaultLayoutStyles } from './DefaultLayoutStyles';

export interface ILayoutProps {
  children?: React.ReactNode;
}

const DefaultLayoutComponent = ({ children }: ILayoutProps) => {
  const classes = useDefaultLayoutStyles();

  return <div className={classes.root}>{children}</div>;
};

export const DefaultLayout = DefaultLayoutComponent;
