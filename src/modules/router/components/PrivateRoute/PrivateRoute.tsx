import { useAccount } from 'modules/account/hooks/useAccount';
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { ConnectWallet } from '../ConnectWallet';

interface IPrivateRouteProps extends RouteProps {}

export const PrivateRoute = (props: IPrivateRouteProps) => {
  const { isConnected } = useAccount();

  if (isConnected) {
    return <Route {...props} />;
  }

  // TODO Update placeholder https://ankrnetwork.atlassian.net/browse/FD-3422
  return <Route {...props} component={ConnectWallet} />;
};
