import loadable, { LoadableComponent } from '@loadable/component';
import { generatePath } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { PrivateRoute } from '../router/components/PrivateRoute';
import { AuctionType } from '../overview/api/auctionType';
import { useParams } from 'react-router';

export const PATH_SELL_NFT = '/nft/sell/pool-id/:poolId/pool-type/:poolType';

export const SellNFTRoutesConfig = {
  DetailsNFT: {
    path: PATH_SELL_NFT,
    generatePath: (poolId: number, poolType: AuctionType) =>
      generatePath(PATH_SELL_NFT, { poolId, poolType }),
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

export function SellNFTRoutes() {
  return (
    <>
      <PrivateRoute
        path={SellNFTRoutesConfig.DetailsNFT.path}
        exact={true}
        component={LoadableDetailsNFTContainer}
      />
    </>
  );
}
