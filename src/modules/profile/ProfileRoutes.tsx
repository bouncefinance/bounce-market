import loadable, { LoadableComponent } from '@loadable/component';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';
import { RouteConfiguration } from 'modules/common/types/RouteConfiguration';
import { generatePath, Route, useParams } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { PrivateRoute } from '../router/components/PrivateRoute';

export const PATH_PROFILE_BASE = '/profile';
export const PATH_USER_PROFILE = `${PATH_PROFILE_BASE}?id=:id?&tab=:tab?`;
export const PATH_OTHER_PROFILE = `${PATH_PROFILE_BASE}/address/:address`;
export const PATH_OTHER_PROFILE_TABS = `${PATH_OTHER_PROFILE}??tab=:tab?`;
export const PATH_EDIT_PROFILE = `${PATH_PROFILE_BASE}/edit`;

export const USER_CREATE_NFT_PROFILE = 'createNft';
export type USER_CREATE_NFT_PROFILE_TYPE = 'createNft';

export enum ProfileTab {
  items = 'items',
  owned = 'owned',
  bids = 'bids',
  sells = 'sale',
  brands = 'brands',
  activity = 'activity',
  liked = 'liked',
  following = 'following',
  followers = 'followers',
}

export const defaultProfileTab = ProfileTab.sells;
export const defaultOtherProfileTab = ProfileTab.items;

export const ProfileRoutesConfig: { [key: string]: RouteConfiguration } = {
  OtherProfile: {
    path: PATH_OTHER_PROFILE,
    generatePath: (address: string, tab?: ProfileTab) =>
      generatePath(PATH_OTHER_PROFILE_TABS, {
        address,
        tab: tab ?? defaultOtherProfileTab,
      }),
    useParams: () => {
      const query = useQueryParams();
      const { address } = useParams<{
        address: string;
      }>();

      return {
        address,
        tab: query.get('tab') ?? defaultProfileTab,
      };
    },
  },

  UserProfile: {
    path: PATH_PROFILE_BASE,
    generatePath: (tab?: ProfileTab, id?: string) =>
      generatePath(PATH_USER_PROFILE, { tab: tab ?? defaultProfileTab, id }),
    useParams: () => {
      const query = useQueryParams();

      const replace = (value: string) =>
        value === ProfileTab.items ? defaultProfileTab : value;
      const tab = replace(query.get('tab') ?? '') || defaultProfileTab;
      const id = query.get('id');
      if (tab === USER_CREATE_NFT_PROFILE) {
        return {
          tab: ProfileTab.brands,
          isCreateNft: true,
          id,
        };
      }
      return {
        tab,
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

const LoadableOtherProfileContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/OtherProfile').then(module => module.OtherProfile),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function ProfileRoutes() {
  return (
    <>
      <Route
        path={ProfileRoutesConfig.OtherProfile.path}
        exact={true}
        component={LoadableOtherProfileContainer}
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
