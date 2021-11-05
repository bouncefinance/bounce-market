import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from 'modules/common/types/RouteConfiguration';
import { Route } from 'react-router-dom';

const PATH_LANDING_PAGE = '/landing';
const PATH_ENTER_PWD = '/enterpwd';
const PATH_CONFIRM_PROFILE = '/confirm';
const PATH_CLAIM_NFT = '/claim';

export const GiftRoutesConfig: { [key: string]: RouteConfiguration } = {
  LandingPage: {
    path: PATH_LANDING_PAGE,
    generatePath: () => PATH_LANDING_PAGE,
  },
  EnterPwd: {
    path: PATH_ENTER_PWD,
    generatePath: () => PATH_ENTER_PWD,
  },
  ConfirmProfile: {
    path: PATH_CONFIRM_PROFILE,
    generatePath: () => PATH_CONFIRM_PROFILE,
  },
  ClaimNft: {
    path: PATH_CLAIM_NFT,
    generatePath: () => PATH_CLAIM_NFT,
  },
};

const LoadableLandingPageContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/LandingPage').then(module => module.LandingPage),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadableEnterPwdContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/EnterPwd').then(module => module.EnterPwd),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadableConfirmProfileContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/ConfirmProfile').then(module => module.ConfirmProfile),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadableClaimNftContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/ClaimNft').then(module => module.ClaimNft),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function GiftRoutes() {
  return (
    <>
      <Route
        path={GiftRoutesConfig.LandingPage.path}
        exact={true}
        component={LoadableLandingPageContainer}
      />
      <Route
        path={GiftRoutesConfig.EnterPwd.path}
        exact={true}
        component={LoadableEnterPwdContainer}
      />
      <Route
        path={GiftRoutesConfig.ConfirmProfile.path}
        exact={true}
        component={LoadableConfirmProfileContainer}
      />
      <Route
        path={GiftRoutesConfig.ClaimNft.path}
        exact={true}
        component={LoadableClaimNftContainer}
      />
    </>
  );
}
