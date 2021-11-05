import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from 'modules/common/types/RouteConfiguration';
import { Route } from 'react-router-dom';

const PATH_ENTER_PWD = '/enterpwd';
const PATH_CONFIRM_PROFILE = '/confirm';

export const GiftRoutesConfig: { [key: string]: RouteConfiguration } = {
  EnterPwd: {
    path: PATH_ENTER_PWD,
    generatePath: () => PATH_ENTER_PWD,
  },
  ConfirmProfile: {
    path: PATH_CONFIRM_PROFILE,
    generatePath: () => PATH_CONFIRM_PROFILE,
  },
};

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

export function GiftRoutes() {
  return (
    <>
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
    </>
  );
}
