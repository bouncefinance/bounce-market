import loadable, { LoadableComponent } from '@loadable/component';
import { useParams } from 'react-router';
import { generatePath } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { PrivateRoute } from '../router/components/PrivateRoute';

export const PATH_USER_PROFILE = '/profile/tab/:tab?';
export const PATH_PROFILE = '/profile/view/:id';
export const PATH_EDIT_PROFILE = '/profile/edit';

export enum ProfileTab {
  items = 'items',
  sells = 'sells',
  bids = 'bids',
  brands = 'brands',
  activity = 'activity',
  liked = 'liked',
  following = 'following',
  followers = 'followers',
}

export const ProfileRoutesConfig = {
  Profile: {
    path: PATH_PROFILE,
    generatePath: (id: string) => generatePath(PATH_PROFILE, { id }),
  },
  UserProfile: {
    path: PATH_USER_PROFILE,
    generatePath: (tab?: ProfileTab) =>
      generatePath(PATH_USER_PROFILE, { tab }),
    useParams: () => {
      const { tab = ProfileTab.items } = useParams<{
        tab: ProfileTab;
      }>();

      return { tab };
    },
  },
  EditProfile: {
    path: PATH_EDIT_PROFILE,
    generatePath: () => PATH_EDIT_PROFILE,
  },
};

const LoadableProfileContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Profile').then(module => module.Profile),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadableEditProfileContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/EditProfile').then(module => module.EditProfile),
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

      <PrivateRoute
        path={ProfileRoutesConfig.EditProfile.path}
        exact={true}
        component={LoadableEditProfileContainer}
      />
    </>
  );
}
