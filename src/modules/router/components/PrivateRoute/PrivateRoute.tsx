import { useAccount } from 'modules/account/hooks/useAccount';
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { ConnectWallet } from '../ConnectWallet';
import { ChangeWallet } from '../ChangeWallet';

interface IPrivateRouteProps extends RouteProps {}

export const PrivateRoute = (props: IPrivateRouteProps) => {
  const { isConnected, isChainSupported } = useAccount();

  if (!isConnected) {
    // TODO Update placeholder https://ankrnetwork.atlassian.net/browse/FD-3422
    return <Route {...props} component={ConnectWallet} />;
  }

  if (isConnected && !isChainSupported) {
    return <Route {...props} component={ChangeWallet} />;
  }

  return <Route {...props} />;
};
