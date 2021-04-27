import loadable, { LoadableComponent } from '@loadable/component';
import React from 'react';
import { Route } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from '../common/types/RouteConfiguration';

const PATH_CREATE_NFT = '/nft/create';
const PATH_PUBLISH_NFT = '/nft/publish';

export const RoutesConfiguration: { [key: string]: RouteConfiguration } = {
  CreateNft: {
    path: PATH_CREATE_NFT,
    generatePath: () => PATH_CREATE_NFT,
  },
  PublishNft: {
    path: PATH_PUBLISH_NFT,
    generatePath: () => PATH_PUBLISH_NFT,
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
      <Route
        path={RoutesConfiguration.CreateNft.path}
        exact={true}
        component={LoadableCreateNFTContainer}
      />
      <Route
        path={RoutesConfiguration.PublishNft.path}
        exact={true}
        component={LoadablePublishNFTContainer}
      />
    </>
  );
}
