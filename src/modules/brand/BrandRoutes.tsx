import loadable, { LoadableComponent } from '@loadable/component';
import { generatePath, Route } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from '../common/types/RouteConfiguration';
import { PrivateRoute } from '../router/components/PrivateRoute';

export const PATH_LIST_BRAND = '/brands';
export const PATH_CREATE_BRAND = '/brand/create';
export const PATH_CREATE_BRAND_ITEM = '/brand/create-item/:id';
export const PATH_MY_BRAND = '/my-brand/:id';
export const PATH_BRAND = '/brand/view/:id';

export const BrandRoutesConfig: { [key: string]: RouteConfiguration } = {
  ListBrand: {
    path: PATH_LIST_BRAND,
    generatePath: () => generatePath(PATH_LIST_BRAND),
  },
  CreateBrand: {
    path: PATH_CREATE_BRAND,
    generatePath: () => generatePath(PATH_CREATE_BRAND),
  },
  CreateBrandItem: {
    path: PATH_CREATE_BRAND_ITEM,
    generatePath: (id: number) => generatePath(PATH_CREATE_BRAND_ITEM, { id }),
  },
  MyBrand: {
    path: PATH_MY_BRAND,
    generatePath: (id: number) => generatePath(PATH_MY_BRAND, { id }),
  },
  Brand: {
    path: PATH_BRAND,
    generatePath: (id: number) => generatePath(PATH_BRAND, { id }),
  },
};

const LoadableListBrandContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Brands').then(module => module.Brands),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadableCreateBrandContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/CreateBrand').then(module => module.CreateBrand),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadableCreateBrandItemContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/CreateBrandItem').then(module => module.CreateBrandItem),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadableMyBrandContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/MyBrand').then(module => module.MyBrand),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadableBrandContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Brand').then(module => module.Brand),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function BrandRoutes() {
  return (
    <>
      <Route
        path={BrandRoutesConfig.ListBrand.path}
        exact={true}
        component={LoadableListBrandContainer}
      />

      <PrivateRoute
        path={BrandRoutesConfig.CreateBrand.path}
        exact={true}
        component={LoadableCreateBrandContainer}
      />

      <PrivateRoute
        path={BrandRoutesConfig.CreateBrandItem.path}
        exact={true}
        component={LoadableCreateBrandItemContainer}
      />

      <PrivateRoute
        path={BrandRoutesConfig.MyBrand.path}
        exact={true}
        component={LoadableMyBrandContainer}
      />

      <Route
        path={BrandRoutesConfig.Brand.path}
        exact={true}
        component={LoadableBrandContainer}
      />
    </>
  );
}
