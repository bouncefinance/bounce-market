import { Box, BoxProps } from '@material-ui/core';
import { LoadingProps } from '@redux-requests/react';
import React from 'react';
import { Spinner } from '../Spinner';

interface IQueryLoadingProps extends LoadingProps {
  size?: number;
}

export const QueryLoading = ({ size }: IQueryLoadingProps) => {
  return <Spinner size={size} />;
};

export const QueryLoadingAbsolute = () => {
  return <Spinner centered={true} />;
};

export const QueryLoadingCentered = (props: BoxProps) => {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <Spinner />
    </Box>
  );
};

export const WhiteQueryLoadingAbsolute = (props: BoxProps) => {
  return (
    <Box display="flex" justifyContent="center" color="#fff" {...props}>
      <Spinner centered />
    </Box>
  );
};
