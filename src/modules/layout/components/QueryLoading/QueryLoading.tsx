import * as React from 'react';
import { Spinner } from '../Spinner';
import { LoadingProps } from '@redux-requests/react';

interface IQueryLoadingProps extends LoadingProps {
  size?: number;
}

export const QueryLoading = ({ size }: IQueryLoadingProps) => {
  return <Spinner size={size} />;
};

export const QueryLoadingAbsolute = () => {
  return <Spinner centered={true} />;
};
