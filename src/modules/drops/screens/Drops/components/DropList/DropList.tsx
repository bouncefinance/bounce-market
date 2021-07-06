import React, { ReactNode } from 'react';
import { useDropListStyles } from './useDropListStyles';

interface IDropListProps {
  children: ReactNode;
}

export const DropList = ({ children }: IDropListProps) => {
  const classes = useDropListStyles();

  const modifyChildren = (child: ReactNode) => (
    <li className={classes.item}>{child}</li>
  );

  return (
    <ul className={classes.list}>
      {React.Children.map(children, modifyChildren)}
    </ul>
  );
};
