import loadable, { LoadableComponent } from '@loadable/component';
import { generatePath } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from '../common/types/RouteConfiguration';
import { PrivateRoute } from '../router/components/PrivateRoute';

export const PATH_USER_PROFILE = '/profile';
export const PATH_PROFILE = '/profile/:id';

export const ProfileRoutesConfig: { [key: string]: RouteConfiguration } = {
  Profile: {
    path: PATH_PROFILE,
    generatePath: (id: string) => generatePath(PATH_PROFILE, { id }),
  },
  UserProfile: {
    path: PATH_USER_PROFILE,
    generatePath: () => PATH_USER_PROFILE,
  },
};

const LoadableProfileContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Profile').then(module => module.Profile),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function ProfileRoutes() {
  return (
    <>
      <PrivateRoute
        path={ProfileRoutesConfig.Profile.path}
        exact={true}
        component={LoadableProfileContainer}
      />

      <PrivateRoute
        path={ProfileRoutesConfig.UserProfile.path}
        exact={true}
        component={LoadableProfileContainer}
      />
    </>
  );
}
