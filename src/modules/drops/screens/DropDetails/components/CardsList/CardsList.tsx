import { Grid } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { useCardsListStyles } from './useCardsListStyles';

interface ICardsListProps {
  children: ReactNode;
}

export const CardsList = ({ children }: ICardsListProps) => {
  const classes = useCardsListStyles();

  const modifyChildren = (child: ReactNode) => {
    return (
      <Grid item xs={12} sm={6} lg={4} className={classes.col}>
        {child}
      </Grid>
    );
  };

  return (
    <Grid container className={classes.row}>
      {React.Children.map(children, child => modifyChildren(child))}
    </Grid>
  );
};
