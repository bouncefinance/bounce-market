import { Box, Fade } from '@material-ui/core';
import React, { ReactNode } from 'react';

interface ITabPanelProps {
  children?: ReactNode;
  index: any;
  value: any;
}

export const TabPanel = ({ children, value, index }: ITabPanelProps) => {
  const isActive = value === index;

  return (
    <div role="tabpanel" hidden={!isActive}>
      {isActive && (
        <Fade in={isActive}>
          <Box>{children}</Box>
        </Fade>
      )}
    </div>
  );
};
