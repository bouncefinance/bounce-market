import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import BigNumber from 'bignumber.js';

interface IApiItem {
  balance: '1';
  contract_addr: '0x479fce86f116665b8a4d07165a0eb7799a4aeb30';
  contract_name: 'bounceNFT';
  description?: string;
  id: number;
  image: null;
  metadata: null;
  name: null;
  owner_addr: '0x5fe96748b9f9f6df3b7f8c71cbd6b62e12997be2';
  provider_link: '';
  token_id: '17102';
  token_type: '721';
  token_uri: '';
}

interface IApiResponse {
  data: {
    nfts721: IApiItem[];
    nfts1155: IApiItem[];
  };
}

interface IItem {
  balance: BigNumber;
  contractAddress: string;
  contractName: string;
  description?: string;
  id: number;
  image: null;
  metadata: null;
  name: null;
  ownerAddress: string;
  providerLink: string;
  tokenId: number;
  tokenType: '721';
  tokenUri: string;
}

interface IResponse {
  nfts721: IItem[];
  nfts1155: IItem[];
}

function mapItem(item: IApiItem): IItem {
  return {
    balance: new BigNumber(item.balance),
    contractAddress: item.contract_addr,
    contractName: item.contract_name,
    description: item.description,
    id: item.id,
    image: item.image,
    metadata: item.metadata,
    name: item.name,
    ownerAddress: item.owner_addr,
    providerLink: item.provider_link,
    tokenId: parseInt(item.token_id, 10),
    tokenType: item.token_type,
    tokenUri: item.token_uri,
  };
}

function mapData(response: IApiResponse): IResponse {
  return {
    nfts721: response.data.nfts721.map(mapItem),
    nfts1155: response.data.nfts1155.map(mapItem),
  };
}

export const fetchNftByUser = createSmartAction<
  RequestAction<IApiResponse, IResponse>
>(
  'fetchNftByUser',
  (
    params: { userId: string },
    meta?: RequestActionMeta<IApiResponse, IResponse>,
  ) => ({
    request: {
      url: 'https://nftview.bounce.finance/v2/bsc/nft',
      method: 'get',
      params: { user_address: params.userId },
    },
    meta: {
      driver: 'axios',
      getData: response => mapData(response),
      ...meta,
    },
  }),
);
