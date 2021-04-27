import { useAccount } from 'modules/account/hooks/useAccount';
import { RoutesConfiguration } from 'modules/overview/Routes';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface IPrivateRouteProps extends RouteProps {}

export const PrivateRoute = (props: IPrivateRouteProps) => {
  const { isConnected } = useAccount();

  if (isConnected) {
    return <Route {...props} />;
  }

  return <Redirect to={RoutesConfiguration.Overview.path} />;
};
