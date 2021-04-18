import loadable, { LoadableComponent } from '@loadable/component';
import React from 'react';
import { Route } from 'react-router-dom';
import { QueryLoadingAbsolute } from '../components/QueryLoading/QueryLoading';
import { RouteConfiguration } from '../common/types/RouteConfiguration';

const PATH_CREATE_NFT = '/nft/create';

export const RoutesConfiguration: { [key: string]: RouteConfiguration } = {
  CreateNft: {
    path: PATH_CREATE_NFT,
    generatePath: () => PATH_CREATE_NFT,
  },
};

const LoadableCreateNFTContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/createNFT').then(module => module.CreateNFT),
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
    </>
  );
}
