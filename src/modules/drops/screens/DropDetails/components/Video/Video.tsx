import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { VideoComponent } from './VideoComponent';
import { VideoSkeleton } from './VideoSkeleton';

export const Video = ({ movieSrc }: { movieSrc: string }) => {
  // for demo purpose
  const [loading, setLoading] = useState(true);

  // for demo purpose
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  return (
    <Box mb={{ xs: 5, md: 10 }}>
      {loading ? (
        <VideoSkeleton />
      ) : (
        <VideoComponent src={movieSrc} muted={false} />
      )}
    </Box>
  );
};
