import loadable, { LoadableComponent } from '@loadable/component';
import { generatePath } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from '../common/types/RouteConfiguration';
import { PrivateRoute } from '../router/components/PrivateRoute';

export const PATH_CREATE_BRAND = '/brand/create';

export const BrandRoutesConfig: { [key: string]: RouteConfiguration } = {
  CreateBrand: {
    path: PATH_CREATE_BRAND,
    generatePath: () => generatePath(PATH_CREATE_BRAND),
  },
};

const LoadableCreateBrandContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/CreateBrand').then(module => module.CreateBrand),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function BrandRoutes() {
  return (
    <>
      <PrivateRoute
        path={BrandRoutesConfig.CreateBrand.path}
        exact={true}
        component={LoadableCreateBrandContainer}
      />
    </>
  );
}
