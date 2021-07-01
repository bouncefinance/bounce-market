import React from 'react';
import { RouteConfiguration } from '../common/types/RouteConfiguration';
import { Route } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import loadable, { LoadableComponent } from '@loadable/component';

const PATH_MARKET = '/market';
//
const LoadableContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Market').then(module => module.Market),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export const MarketRoutesConfig: { [key: string]: RouteConfiguration } = {
  Market: {
    path: PATH_MARKET,
    generatePath: () => PATH_MARKET,
  },
};

export function MarketRoutes() {
  return (
    <Route
      path={MarketRoutesConfig.Market.path}
      exact={true}
      component={LoadableContainer}
    />
  );
}
