import { Box } from '@material-ui/core';
import React, { ReactNode, useCallback } from 'react';
import { useCollectionListStyles } from './useCollectionListStyles';

interface IBrandsListProps {
  children: ReactNode;
}

export const CollectionList = ({ children }: IBrandsListProps) => {
  const classes = useCollectionListStyles();
  const modifyChildren = useCallback(
    (child: any) => {
      return (
        <Box mt={5} className={classes.item}>
          {child}
        </Box>
      );
    },
    [classes],
  );

  return (
    <div className={classes.root}>
      <Box mt={-5}>
        {React.Children.map(children, child => modifyChildren(child))}
      </Box>
    </div>
  );
};
