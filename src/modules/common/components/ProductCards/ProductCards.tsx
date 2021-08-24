import { Grid } from '@material-ui/core';
import React, { ReactNode, useCallback } from 'react';
import { uid } from 'react-uid';
import { ProductCardSkeleton } from '../ProductCard/ProductCardSkeleton';
import { useProductCardsStyles } from './useProductCardsStyles';

interface IProductCardsProps {
  className?: string;
  children?: ReactNode;
  isLoading?: boolean;
  skeletonsCount?: number;
}

export const ProductCards = ({
  children,
  isLoading,
  skeletonsCount = 5,
}: IProductCardsProps) => {
  const classes = useProductCardsStyles();
  const modifyChildren = useCallback(
    (child: any) => {
      return (
        <Grid item xs={12} sm={6} lg={4} xl={3} className={classes.col}>
          {child}
        </Grid>
      );
    },
    [classes.col],
  );

  const renderedSkeletons = Array(skeletonsCount)
    .fill(0)
    .map((_, i) => <ProductCardSkeleton key={uid(i)} />);

  return (
    <Grid container className={classes.row}>
      {React.Children.map(isLoading ? renderedSkeletons : children, child =>
        modifyChildren(child),
      )}
    </Grid>
  );
};
