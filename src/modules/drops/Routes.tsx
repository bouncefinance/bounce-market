import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from 'modules/common/types/RouteConfiguration';
import React from 'react';
import { Route } from 'react-router-dom';

const PATH_DROPS = '/drops';

export const DropsRoutesConfig: { [key: string]: RouteConfiguration } = {
  Drops: {
    path: PATH_DROPS,
    generatePath: () => PATH_DROPS,
  },
};

const LoadableContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Drops').then(module => module.Drops),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function DropsRoutes() {
  return (
    <Route
      path={DropsRoutesConfig.Drops.path}
      exact={true}
      component={LoadableContainer}
    />
  );
}
