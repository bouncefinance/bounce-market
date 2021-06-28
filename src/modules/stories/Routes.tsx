import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from 'modules/common/types/RouteConfiguration';
import React from 'react';
import { Route } from 'react-router-dom';

const PATH_STORIES = '/stories';

export const StoriesRoutesConfig: { [key: string]: RouteConfiguration } = {
  Stories: {
    path: PATH_STORIES,
    generatePath: () => PATH_STORIES,
  },
};

const LoadableContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Stories').then(module => module.Stories),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function StoriesRoutes() {
  return (
    <Route
      path={StoriesRoutesConfig.Stories.path}
      exact={true}
      component={LoadableContainer}
    />
  );
}
