import { Fade, Grid } from '@material-ui/core';
import React, { ReactNode, useCallback } from 'react';
import InView from 'react-intersection-observer';
import { useProductCardsStyles } from './useProductCardsStyles';

interface IProductCardsProps {
  className?: string;
  children: ReactNode;
}

export const ProductCards = ({ children }: IProductCardsProps) => {
  const classes = useProductCardsStyles();

  const modifyChildren = useCallback(
    (child: any) => {
      return (
        <InView rootMargin="-10% 0% -10% 0%">
          {({ inView, ref }) => (
            <Fade in={inView}>
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                xl={3}
                ref={ref}
                className={classes.col}
              >
                {child}
              </Grid>
            </Fade>
          )}
        </InView>
      );
    },
    [classes],
  );

  return (
    <Grid container className={classes.row}>
      {React.Children.map(children, child => modifyChildren(child))}
    </Grid>
  );
};
