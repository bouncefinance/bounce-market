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
        path={CreateNFTRoutesConfig.CreateNft.path}
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

      <PrivateRoute component={PageNotFound} />
    </Switch>
  );
}
