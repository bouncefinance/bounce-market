import { Box, Typography } from '@material-ui/core';
import { Button } from 'modules/uiKit/Button';
import React from 'react';
import { useNoItemsStyles } from './useNoItemsStyles';

interface INoItemsProps {
  href?: string;
  onClick?: () => void;
}

export const NoItems = ({ href, onClick }: INoItemsProps) => {
  const classes = useNoItemsStyles();

  return (
    <Box py={5} textAlign="center">
      <Typography variant="h2" className={classes.title}>
        No items found
      </Typography>

      <Typography className={classes.descr}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore
      </Typography>

      <Button href={href} onClick={onClick} size="large">
        Browse market
      </Button>
    </Box>
  );
};
