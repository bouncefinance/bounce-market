import { useAccount } from 'modules/account/hooks/useAccount';
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { NotConnected } from '../NotConnected';

interface IPrivateRouteProps extends RouteProps {}

export const PrivateRoute = (props: IPrivateRouteProps) => {
  const { isConnected, handleConnect, loading } = useAccount();

  if (isConnected) {
    return <Route {...props} />;
  }

  return (
    <Route
      {...props}
      component={undefined}
      render={() => (
        <NotConnected onConnect={handleConnect} isLoading={loading} />
      )}
    />
  );
};
