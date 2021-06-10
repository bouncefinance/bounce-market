import { Box, Card, CardContent } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import React from 'react';
import { useProductCardSkeletonStyles } from './useProductCardSkeletonStyles';
import { useProductCardStyles } from './useProductCardStyles';

interface IProductCardSkeletonProps {
  className?: string;
}

export const ProductCardSkeleton = ({
  className,
}: IProductCardSkeletonProps) => {
  const classes = useProductCardSkeletonStyles();
  const cardClasses = useProductCardStyles();

  return (
    <Card
      className={classNames(cardClasses.root, className)}
      variant="outlined"
    >
      <Skeleton className={classes.media} variant="rect" />

      <CardContent>
        <Box mb={2}>
          <Skeleton variant="text" />
        </Box>

        <hr className={cardClasses.devider} />

        <Box mb={2}>
          <Skeleton variant="text" width="40%" />
        </Box>

        <div className={cardClasses.infoContainer}>
          <Skeleton variant="text" width={65} />
          <Skeleton variant="text" width={50} />
        </div>
      </CardContent>
    </Card>
  );
};
