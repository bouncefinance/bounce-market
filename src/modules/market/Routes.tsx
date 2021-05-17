import loadable, { LoadableComponent } from '@loadable/component';
import { PrivateRoute } from 'modules/router/components/PrivateRoute';
import React from 'react';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from '../common/types/RouteConfiguration';

const PATH_MARKET = '/market';

export const MarketRoutesConfig: { [key: string]: RouteConfiguration } = {
  Market: {
    path: PATH_MARKET,
    generatePath: () => PATH_MARKET,
  },
};

const LoadableContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Market').then(module => module.Market),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function MarketRoutes() {
  return (
    <PrivateRoute
      path={MarketRoutesConfig.Market.path}
      exact={true}
      component={LoadableContainer}
    />
  );
}
