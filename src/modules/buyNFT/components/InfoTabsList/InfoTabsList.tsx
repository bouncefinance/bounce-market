import React, { Children, ReactNode, useCallback } from 'react';
import { useInfoTabsListStyles } from './useInfoTabsListStyles';

interface IInfoTabsListProps {
  children?: ReactNode;
}

export const InfoTabsList = ({ children }: IInfoTabsListProps) => {
  const classes = useInfoTabsListStyles();

  const modifyChildren = useCallback(
    (child: any) => {
      return <li className={classes.item}>{child}</li>;
    },
    [classes.item],
  );

  return (
    <ul className={classes.root}>
      {Children.map(children, child => modifyChildren(child))}
    </ul>
  );
};
