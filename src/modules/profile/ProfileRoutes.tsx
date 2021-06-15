import loadable, { LoadableComponent } from '@loadable/component';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';
import { generatePath } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { PrivateRoute } from '../router/components/PrivateRoute';

export const PATH_PROFILE_BASE = '/profile';
export const PATH_USER_PROFILE = `${PATH_PROFILE_BASE}?tab=:tab?`;
export const PATH_PROFILE = `${PATH_PROFILE_BASE}/view/:id`;
export const PATH_EDIT_PROFILE = `${PATH_PROFILE_BASE}/edit`;

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

const defaultProfileTab = ProfileTab.items;

export const ProfileRoutesConfig = {
  Profile: {
    path: PATH_PROFILE,
    generatePath: (id: string) => generatePath(PATH_PROFILE, { id }),
  },
  UserProfile: {
    path: PATH_PROFILE_BASE,
    generatePath: (tab?: ProfileTab) =>
      generatePath(PATH_USER_PROFILE, { tab: tab ?? defaultProfileTab }),
    useParams: () => {
      const query = useQueryParams();

      return {
        tab: query.get('tab') ?? defaultProfileTab,
      };
    },
  },
  EditProfile: {
    path: PATH_EDIT_PROFILE,
    generatePath: () => PATH_EDIT_PROFILE,
  },
};

const LoadableProfileContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Profile/index').then(module => module.Profile),
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
