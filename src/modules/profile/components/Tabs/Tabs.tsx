import { Tabs as TabsComponent, TabsProps } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { useTabsStyles } from './useTabsStyles';

interface ITabsProps extends TabsProps {}

export const Tabs = ({ className, ...restProps }: ITabsProps) => {
  const classes = useTabsStyles();

  return (
    <TabsComponent
      {...restProps}
      className={classNames(classes.root, className)}
      variant="scrollable"
    />
  );
};
