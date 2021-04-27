import { Tab, Tabs as TabsComponent } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { uid } from 'react-uid';
import { useTabsStyles } from './useTabsStyles';

interface ItemProps {
  value: any;
  label: string;
  count?: number;
}

interface ITabsProps {
  value: string | number;
  onChange: (event: any, value: any) => void;
  items: ItemProps[];
  className?: string;
}

export const Tabs = ({ onChange, value, items, className }: ITabsProps) => {
  const classes = useTabsStyles();

  return (
    <TabsComponent
      className={classNames(classes.root, className)}
      value={value}
      onChange={onChange}
      variant="scrollable"
    >
      {items.map(({ label, value, count }) => (
        <Tab
          classes={{
            root: classes.tab,
            wrapper: classes.tabWrapper,
          }}
          key={uid(label)}
          value={value}
          label={
            <>
              {label}
              {typeof count !== 'undefined' && (
                <span className={classes.tabCount}>{count}</span>
              )}
            </>
          }
        />
      ))}
    </TabsComponent>
  );
};
