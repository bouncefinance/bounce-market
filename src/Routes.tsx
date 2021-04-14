import { Switch } from 'react-router-dom';
import { DefaultLayout } from './modules/layout/components/DefautLayout';
import { Routes as OverviewRoutes } from './modules/overview/Routes';
import { PageNotFound } from './modules/router/components/PageNotFound';
import { PrivateRoute } from './modules/router/components/PrivateRoute';
import { Themes } from './modules/themes/types';

export function Routes() {
  return (
    <Switch>
      <DefaultLayout headerTheme={Themes.dark}>
        <OverviewRoutes />
      </DefaultLayout>
      <PrivateRoute component={PageNotFound} />
    </Switch>
  );
}
