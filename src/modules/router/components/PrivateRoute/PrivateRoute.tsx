import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface IPrivateRouteProps extends RouteProps {
  component: any;
}

export const PrivateRoute = (props: IPrivateRouteProps) => {
  // const store = useStore<IStoreState>();

  // TODO Pass data
  // if (isConnected) {
  return <Route {...props} />;
  // }

  // return <Redirect to={INDEX_PATH} />;
};
