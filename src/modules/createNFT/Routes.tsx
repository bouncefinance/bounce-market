import loadable, { LoadableComponent } from '@loadable/component';
import React from 'react';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from '../common/types/RouteConfiguration';
import { PrivateRoute } from '../router/components/PrivateRoute';
import { generatePath } from 'react-router-dom';

const PATH_CREATE_NFT = '/nft/create';
const PATH_PUBLISH_NFT = '/:type/publish/:contract/:id';

export enum PublishNFTType {
  NFT = 'nft',
  BrandNFT = 'brand-nft',
}

export const RoutesConfiguration: { [key: string]: RouteConfiguration } = {
  CreateNft: {
    path: PATH_CREATE_NFT,
    generatePath: () => PATH_CREATE_NFT,
  },
  PublishNft: {
    path: PATH_PUBLISH_NFT,
    generatePath: (type: PublishNFTType, contract: string, id: number) =>
      generatePath(PATH_PUBLISH_NFT, { type, contract, id }),
  },
};

const LoadableCreateNFTContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/CreateNFT').then(module => module.CreateNFT),
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

export function Routes() {
  return (
    <>
      <PrivateRoute
        path={RoutesConfiguration.CreateNft.path}
        exact={true}
        component={LoadableCreateNFTContainer}
      />
      <PrivateRoute
        path={RoutesConfiguration.PublishNft.path}
        exact={true}
        component={LoadablePublishNFTContainer}
      />
    </>
  );
}
