import loadable, { LoadableComponent } from '@loadable/component';
import { generatePath } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from '../common/types/RouteConfiguration';
import { PrivateRoute } from '../router/components/PrivateRoute';
import { NftType } from '../createNFT/actions/createNft';

export const PATH_DETAILS_NFT = '/nft/auction/:poolId/:nftType';

export const DetailsNFTRoutesConfig: { [key: string]: RouteConfiguration } = {
  DetailsNFT: {
    path: PATH_DETAILS_NFT,
    generatePath: (poolId: string, nftType: NftType) =>
      generatePath(PATH_DETAILS_NFT, { poolId, nftType }),
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
