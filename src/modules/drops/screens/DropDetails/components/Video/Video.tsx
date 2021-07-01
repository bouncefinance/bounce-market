import { Box } from '@material-ui/core';
import React from 'react';
import { VideoComponent } from './VideoComponent';

export const Video = () => {
  return (
    <Box mb={{ xs: 5, md: 10 }}>
      <VideoComponent
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        muted={false}
      />
    </Box>
  );
};
