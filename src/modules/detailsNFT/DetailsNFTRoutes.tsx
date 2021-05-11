import loadable, { LoadableComponent } from '@loadable/component';
import { generatePath } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from '../common/types/RouteConfiguration';
import { PrivateRoute } from '../router/components/PrivateRoute';

export const PATH_DETAILS_NFT = '/nft/details/:contract/:id';

export const DetailsNFTRoutesConfig: { [key: string]: RouteConfiguration } = {
  DetailsNFT: {
    path: PATH_DETAILS_NFT,
    generatePath: (contract: string, id: string) =>
      generatePath(PATH_DETAILS_NFT, { id, contract }),
  },
};

const LoadableDetailsNFTContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/DetailsNFT').then(module => module.DetailsNFT),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function DetailsNFTRoutes() {
  return (
    <>
      <PrivateRoute
        path={DetailsNFTRoutesConfig.DetailsNFT.path}
        exact={true}
        component={LoadableDetailsNFTContainer}
      />
    </>
  );
}
