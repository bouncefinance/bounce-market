import loadable, { LoadableComponent } from '@loadable/component';
import { useParams } from 'react-router';
import { generatePath } from 'react-router-dom';
import { AuctionType } from '../api/common/auctionType';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { PrivateRoute } from '../router/components/PrivateRoute';

export const PATH_BUY_NFT = '/nft/buy/poolId/:poolId/poolType/:poolType';

export const BuyNFTRoutesConfig = {
  DetailsNFT: {
    path: PATH_BUY_NFT,
    generatePath: (poolId: number, poolType: AuctionType) =>
      generatePath(PATH_BUY_NFT, { poolId, poolType }),
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
  async () => import('./screens/BuyNFT').then(module => module.BuyNFT),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function BuyNFTRoutes() {
  return (
    <>
      <PrivateRoute
        path={BuyNFTRoutesConfig.DetailsNFT.path}
        exact={true}
        component={LoadableDetailsNFTContainer}
      />
    </>
  );
}
