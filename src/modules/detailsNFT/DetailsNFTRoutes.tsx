import loadable, { LoadableComponent } from '@loadable/component';
import { Route } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from '../common/types/RouteConfiguration';
import { generatePath } from 'react-router-dom';

export const PATH_DETAILS_NFT = '/nft/details/:id';

export const DetailsNFTRoutesConfig: { [key: string]: RouteConfiguration } = {
  DetailsNFT: {
    path: PATH_DETAILS_NFT,
    generatePath: (id: string) => generatePath(PATH_DETAILS_NFT, { id }),
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
      <Route
        path={DetailsNFTRoutesConfig.DetailsNFT.path}
        exact={true}
        component={LoadableDetailsNFTContainer}
      />
    </>
  );
}
