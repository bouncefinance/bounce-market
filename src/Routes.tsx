import {
  ProfileRoutes,
  ProfileRoutesConfig,
} from 'modules/profile/ProfileRoutes';
import { Route, Switch } from 'react-router-dom';
import {
  Routes as CreateNFTRoutes,
  RoutesConfiguration as CreateNFTRoutesConfig,
} from './modules/createNFT/Routes';
import {
  DetailsNFTRoutes,
  DetailsNFTRoutesConfig,
} from './modules/detailsNFT/DetailsNFTRoutes';
import { DefaultLayout } from './modules/layout/components/DefautLayout';
import {
  Routes as OverviewRoutes,
  RoutesConfiguration as OverviewRoutesConfig,
} from './modules/overview/Routes';
import { PageNotFound } from './modules/router/components/PageNotFound';
import { PrivateRoute } from './modules/router/components/PrivateRoute';
import { Themes } from './modules/themes/types';

export function Routes() {
  return (
    <Switch>
      <Route
        exact
        path={OverviewRoutesConfig.Overview.path}
        render={() => (
          <DefaultLayout headerTheme={Themes.dark}>
            <OverviewRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={[
          CreateNFTRoutesConfig.CreateNft.path,
          CreateNFTRoutesConfig.PublishNft.path,
        ]}
        render={() => (
          <DefaultLayout>
            <CreateNFTRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={DetailsNFTRoutesConfig.DetailsNFT.path}
        render={() => (
          <DefaultLayout>
            <DetailsNFTRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={ProfileRoutesConfig.EditProfile.path}
        render={() => (
          <DefaultLayout>
            <ProfileRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={ProfileRoutesConfig.UserProfile.path}
        render={() => (
          <DefaultLayout>
            <ProfileRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={ProfileRoutesConfig.Profile.path}
        render={() => (
          <DefaultLayout>
            <ProfileRoutes />
          </DefaultLayout>
        )}
      />

      <PrivateRoute component={PageNotFound} />
    </Switch>
  );
}
