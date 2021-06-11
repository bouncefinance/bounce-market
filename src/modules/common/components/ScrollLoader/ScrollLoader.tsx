import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { QueryLoading } from '../QueryLoading/QueryLoading';

interface IScrollLoader {
  onLoadMore: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingComponent?: JSX.Element;
}

export const ScrollLoader = ({
  disabled = false,
  isLoading = true,
  onLoadMore,
  loadingComponent,
}: IScrollLoader) => {
  const { ref, inView } = useInView({
    rootMargin: '10% 0% 0%',
  });

  useEffect(() => {
    if (inView && !disabled && !isLoading) {
      onLoadMore();
    }
  }, [disabled, inView, isLoading, onLoadMore]);

  const renderedPreloader = loadingComponent ?? (
    <Box textAlign="center">
      <QueryLoading />
    </Box>
  );

  const rendered = isLoading ? (
    renderedPreloader
  ) : (
    <div ref={ref} style={{ height: 1 }} />
  );

  return disabled ? null : rendered;
};
