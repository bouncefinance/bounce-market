import React from 'react';
import { Switch } from 'react-router-dom';
import { PageNotFound } from './modules/router/components/PageNotFound';
import { PrivateRoute } from './modules/router/components/PrivateRoute';
import { Routes as OverviewRoutes } from './modules/overview/Routes';
import { DefaultLayout } from './modules/layout/components/DefautLayout';

export function Routes() {
  return (
    <Switch>
      <DefaultLayout>
        <OverviewRoutes />
      </DefaultLayout>
      <PrivateRoute component={PageNotFound} />
    </Switch>
  );
}
