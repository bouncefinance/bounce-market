import loadable, { LoadableComponent } from '@loadable/component';
import { generatePath } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from '../common/types/RouteConfiguration';
import { PrivateRoute } from '../router/components/PrivateRoute';

export const PATH_LIST_BRAND = '/brand';
export const PATH_CREATE_BRAND = '/brand/create';
export const PATH_CREATE_BRAND_ITEM = '/brand/create-item/:id';
export const PATH_MY_BRAND = '/my-brand';

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
    generatePath: () => generatePath(PATH_MY_BRAND),
  }
};

const LoadableListBrandContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/ListBrand').then(module => module.ListBrand),
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
  async () =>
    import('./screens/MyBrand').then(module => module.MyBrand),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function BrandRoutes() {
  return (
    <>
      <PrivateRoute
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
    </>
  );
}
