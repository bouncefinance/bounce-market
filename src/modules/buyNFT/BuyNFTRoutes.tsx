import loadable, { LoadableComponent } from '@loadable/component';
import { USER_CREATE_NFT_PROFILE_TYPE } from 'modules/profile/ProfileRoutes';
import { useParams } from 'react-router';
import { generatePath } from 'react-router-dom';
import { AuctionType } from '../api/common/auctionType';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { PrivateRoute } from '../router/components/PrivateRoute';

export const PATH_BUY_NFT = '/nft/buy/poolId/:poolId/poolType/:poolType';
export const PATH_BUY_ITEM_NFT = `/item/buy/poolId/:poolId/contract/:contract`;

export const BuyNFTRoutesConfig = {
  DetailsNFT: {
    path: PATH_BUY_NFT,
    generatePath: (
      poolId: number,
      poolType: AuctionType | USER_CREATE_NFT_PROFILE_TYPE,
    ) => generatePath(PATH_BUY_NFT, { poolId, poolType }),
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
  Details_ITEM_NFT: {
    path: PATH_BUY_ITEM_NFT,
    generatePath: (poolId: number, contract: string) =>
      generatePath(PATH_BUY_ITEM_NFT, { poolId, contract }),
    useParams: () => {
      const { poolId: poolIdParam, contract } = useParams<{
        poolId: string;
        contract: string;
      }>();

      const poolId = parseInt(poolIdParam, 10);

      return {
        poolId,
        contract,
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

const LoadableDetailsNFTItemContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/BuyNFT').then(module => module.BuyItemNFT),
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

export function BuyItemNFTRoutes() {
  return (
    <>
      <PrivateRoute
        path={BuyNFTRoutesConfig.Details_ITEM_NFT.path}
        exact={true}
        component={LoadableDetailsNFTItemContainer}
      />
    </>
  );
}
