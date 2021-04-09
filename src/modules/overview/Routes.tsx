import loadable, { LoadableComponent } from '@loadable/component';
import React from 'react';
import { Route } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../layout/components/QueryLoading/QueryLoading';
import { INDEX_PATH } from '../router/const';

const LoadableOverviewContainer = loadable(
  async () => import('./screens/Overview').then(module => module.Overview),
  {
    fallback: <QueryLoadingAbsolute />,
  },
) as LoadableComponent<any>;

export function Routes() {
  return (
    <>
      <Route
        path={INDEX_PATH}
        exact={true}
        component={LoadableOverviewContainer}
      />
    </>
  );
}
