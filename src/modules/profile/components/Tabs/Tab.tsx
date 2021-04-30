import { Tab as TabComponent, TabProps } from '@material-ui/core';
import React from 'react';
import { useTabsStyles } from './useTabsStyles';

interface ITabProps extends TabProps {
  count?: number;
}

export const Tab = ({ label, count, ...restProps }: ITabProps) => {
  const classes = useTabsStyles();

  return (
    <TabComponent
      {...restProps}
      classes={{
        root: classes.tab,
        wrapper: classes.tabWrapper,
      }}
      label={
        <>
          {label}
          {typeof count !== 'undefined' && (
            <span className={classes.tabCount}>{count}</span>
          )}
        </>
      }
    />
  );
};
