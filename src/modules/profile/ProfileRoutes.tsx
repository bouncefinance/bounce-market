import loadable, { LoadableComponent } from '@loadable/component';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';
import { RouteConfiguration } from 'modules/common/types/RouteConfiguration';
import { generatePath, Route, useParams } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { PrivateRoute } from '../router/components/PrivateRoute';

export const PATH_PROFILE_BASE = '/profile';
export const PATH_USER_PROFILE = `${PATH_PROFILE_BASE}?id=:id?&brand=:brand?&tab=:tab?`;
export const PATH_OTHER_PROFILE = `${PATH_PROFILE_BASE}/address/:address`;
export const PATH_OTHER_PROFILE_TABS = `${PATH_OTHER_PROFILE}??id=:id?&tab=:tab?`;
export const PATH_EDIT_PROFILE = `${PATH_PROFILE_BASE}/edit`;
export const PATH_COLLECTION_BASE = `/collection`;
export const PATH_COLLECTION_PROFILE = `${PATH_COLLECTION_BASE}?address=:address&art=:art&tab=:tab?`;

export const USER_CREATE_NFT_PROFILE = 'createNft';
export type USER_CREATE_NFT_PROFILE_TYPE = 'createNft';

export enum ProfileTab {
  items = 'items',
  owned = 'owned',
  bids = 'bids',
  sells = 'sale',
  collections = 'collections',
  activity = 'activity',
  liked = 'liked',
  following = 'following',
  followers = 'followers',
}

export const defaultProfileTab = ProfileTab.sells;
export const defaultOtherProfileTab = ProfileTab.sells;
export const defaultCollectionTab = ProfileTab.sells;

export const ProfileRoutesConfig: { [key: string]: RouteConfiguration } = {
  OtherProfile: {
    path: PATH_OTHER_PROFILE,
    generatePath: (address: string, tab?: ProfileTab, id?: string) =>
      generatePath(PATH_OTHER_PROFILE_TABS, {
        address,
        tab: tab ?? defaultOtherProfileTab,
        id,
      }),
    useParams: () => {
      const query = useQueryParams();
      const { address } = useParams<{
        address: string;
      }>();
      const replace = (value: string) =>
        value === ProfileTab.items ? defaultOtherProfileTab : value;
      const tab = replace(query.get('tab') ?? '') || defaultOtherProfileTab;
      const id = query.get('id');
      if (tab === USER_CREATE_NFT_PROFILE) {
        return {
          address,
          isCreateNft: true,
          tab: ProfileTab.collections,
          id,
        };
      }
      return {
        address,
        tab: query.get('tab') ?? defaultProfileTab,
      };
    },
  },

  UserProfile: {
    path: PATH_PROFILE_BASE,
    generatePath: (tab?: ProfileTab, id?: string, brand?: string) =>
      generatePath(PATH_USER_PROFILE, {
        tab: tab ?? defaultProfileTab,
        id,
        brand,
      }),
    useParams: () => {
      const query = useQueryParams();

      const replace = (value: string) =>
        value === ProfileTab.items ? defaultProfileTab : value;
      const tab = replace(query.get('tab') ?? '') || defaultProfileTab;
      const id = query.get('id');
      const brand = query.get('brand');
      if (tab === USER_CREATE_NFT_PROFILE) {
        return {
          tab: ProfileTab.collections,
          isCreateNft: true,
          id,
          brand,
        };
      }
      return {
        tab,
        brand,
      };
    },
  },

  EditProfile: {
    path: PATH_EDIT_PROFILE,
    generatePath: () => PATH_EDIT_PROFILE,
  },

  Collection: {
    path: PATH_COLLECTION_BASE,
    generatePath: (address?: string, tab?: ProfileTab, art?: string) => {
      return generatePath(PATH_COLLECTION_PROFILE, {
        address,
        tab: tab ?? defaultCollectionTab,
        art: art ?? '_',
      });
    },
    useParams: () => {
      const query = useQueryParams();
      return {
        address: query.get('address'),
        tab: query.get('tab') || defaultCollectionTab,
        art: query.get('art'),
      };
    },
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

const LoadableCollectionContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Collection').then(module => module.Collection),
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

      <Route
        path={ProfileRoutesConfig.Collection.path}
        exact={true}
        component={LoadableCollectionContainer}
      />
    </>
  );
}
