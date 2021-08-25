import loadable, { LoadableComponent } from '@loadable/component';
import { generatePath, Route } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from '../common/types/RouteConfiguration';
import { PrivateRoute } from '../router/components/PrivateRoute';

export const PATH_LIST_BRAND = '/brands';
export const PATH_CREATE_BRAND = '/brand/create';
export const PATH_CREATE_BRAND_ITEM = '/collection/create-item/:brandId';
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
  CreateCollectionItem: {
    path: PATH_CREATE_BRAND_ITEM,
    generatePath: (brandId: string) =>
      generatePath(PATH_CREATE_BRAND_ITEM, { brandId }),
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

const LoadableCreateCollectionItemContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/CreateCollectionItem').then(
      module => module.CreateCollectionItem,
    ),
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
        path={BrandRoutesConfig.CreateCollectionItem.path}
        exact={true}
        component={LoadableCreateCollectionItemContainer}
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
