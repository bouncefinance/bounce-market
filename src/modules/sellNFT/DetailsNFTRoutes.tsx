import loadable, { LoadableComponent } from '@loadable/component';
import { generatePath } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { PrivateRoute } from '../router/components/PrivateRoute';
import { AuctionType } from '../overview/api/auctionType';
import { useParams } from 'react-router';

export const PATH_DETAILS_NFT = '/nft/auction/:poolId/:poolType';

export const DetailsNFTRoutesConfig = {
  DetailsNFT: {
    path: PATH_DETAILS_NFT,
    generatePath: (poolId: number, poolType: AuctionType) =>
      generatePath(PATH_DETAILS_NFT, { poolId, poolType }),
    useParams: () => {
      const { poolId: poolIdParam, poolType } = useParams<{
        poolId: string;
        poolType: AuctionType;
      }>();

      const poolId = parseInt(poolIdParam, 10);

      return {
        poolType,
        poolId,
      };
    },
  },
};

const LoadableDetailsNFTContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/SellNFT').then(module => module.SellNFT),
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
