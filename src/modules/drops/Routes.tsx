import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from 'modules/common/types/RouteConfiguration';
import React from 'react';
import { useParams } from 'react-router';
import { generatePath, Route } from 'react-router-dom';

const PATH_DROPS = '/drops';
const PATH_DROP_DETAILS = '/drop/view/:dropId';

export const DropsRoutesConfig: { [key: string]: RouteConfiguration } = {
  Drops: {
    path: PATH_DROPS,
    generatePath: () => PATH_DROPS,
  },

  DropDetails: {
    path: PATH_DROP_DETAILS,
    generatePath: (dropId: string) =>
      generatePath(PATH_DROP_DETAILS, { dropId }),
    useParams: () => {
      const { dropId } = useParams<{ dropId: string }>();

      return {
        dropId,
      };
    },
  },
};

const LoadableContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Stories').then(module => module.Stories),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadableDropDetailsContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/DropDetails').then(module => module.DropDetails),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function StoriesRoutes() {
  return (
    <>
      <Route
        path={DropsRoutesConfig.Drops.path}
        exact={true}
        component={LoadableContainer}
      />

      <Route
        path={DropsRoutesConfig.DropDetails.path}
        exact={true}
        component={LoadableDropDetailsContainer}
      />
    </>
  );
}
