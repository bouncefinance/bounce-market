import { Container } from '@material-ui/core';
import classNames from 'classnames';
import { Children, ReactNode, useCallback } from 'react';
import { useInfoStyles } from './useInfoStyles';

interface IInfoProps {
  className?: string;
  children: ReactNode;
}

export const Info = ({ className, children }: IInfoProps) => {
  const classes = useInfoStyles();

  const modifyChildren = useCallback(
    (child: any) => {
      return (
        <Container component="li" className={classes.item}>
          <div className={classes.itemInner}>{child}</div>
        </Container>
      );
    },
    [classes],
  );

  return (
    <div className={classNames(classes.root, className)}>
      <ul className={classes.list}>
        {Children.map(children, child => modifyChildren(child))}
      </ul>
    </div>
  );
};
