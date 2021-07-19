import loadable, { LoadableComponent } from '@loadable/component';
import React from 'react';
import { Route } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from '../common/types/RouteConfiguration';

const PATH_INDEX = '/index';

export const RoutesConfiguration: { [key: string]: RouteConfiguration } = {
  Overview: {
    path: PATH_INDEX,
    generatePath: () => PATH_INDEX,
  },
};

const LoadableOverviewContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Overview').then(module => module.Overview),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function Routes() {
  return (
    <>
      <Route
        path={RoutesConfiguration.Overview.path}
        exact={true}
        component={LoadableOverviewContainer}
      />
    </>
  );
}
