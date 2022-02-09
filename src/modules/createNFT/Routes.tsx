import loadable, { LoadableComponent } from '@loadable/component';
import React from 'react';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from '../common/types/RouteConfiguration';
import { PrivateRoute } from '../router/components/PrivateRoute';
import { generatePath } from 'react-router-dom';

const PATH_CREATE_NFT = '/nft/create';
const PATH_DEPOSIT_TONE = '/depositToken';
const PATH_PUBLISH_NFT = '/publish/:contract/:id';
const PATH_PUBLISH_ERC20 = '/publishErc20//:id';

export const RoutesConfiguration: { [key: string]: RouteConfiguration } = {
  CreateNft: {
    path: PATH_CREATE_NFT,
    generatePath: () => PATH_CREATE_NFT,
  },
  DepositToken: {
    path: PATH_DEPOSIT_TONE,
    generatePath: () => PATH_DEPOSIT_TONE,
  },
  PublishNft: {
    path: PATH_PUBLISH_NFT,
    generatePath: (contract: string, id: number) =>
      generatePath(PATH_PUBLISH_NFT, { contract, id }),
  },
  PublishErc20: {
    path: PATH_PUBLISH_ERC20,
    generatePath: (id: number) =>
      generatePath(PATH_PUBLISH_ERC20, { id }),
  },
};

const LoadableCreateNFTContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/CreateNFT').then(module => module.CreateNFT),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadableDepositContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/DepositToken').then(module => module.DepositToken),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadablePublishNFTContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/PublishNFT').then(module => module.PublishNFT),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);
const LoadablePublishErc20Container: LoadableComponent<any> = loadable(
  async () => import('./screens/PublishNFT').then(module => module.PublishErc20),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function Routes() {
  return (
    <>
      <PrivateRoute
        path={RoutesConfiguration.CreateNft.path}
        exact={true}
        component={LoadableCreateNFTContainer}
      />
      <PrivateRoute
        path={RoutesConfiguration.DepositToken.path}
        exact={true}
        component={LoadableDepositContainer}
      />
      <PrivateRoute
        path={RoutesConfiguration.PublishNft.path}
        exact={true}
        component={LoadablePublishNFTContainer}
      />
      <PrivateRoute
        path={RoutesConfiguration.PublishErc20.path}
        exact={true}
        component={LoadablePublishErc20Container}
      />
    </>
  );
}
