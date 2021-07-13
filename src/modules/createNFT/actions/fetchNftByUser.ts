import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { NftType } from 'modules/api/common/NftType';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { Address } from '../../common/types/unit';

interface IApiItem {
  balance: string;
  contract_addr: string;
  contract_name: 'bounceNFT';
  description?: string;
  id: number;
  hash?: string;
  image: null;
  metadata: null;
  name: null;
  owner_addr: Address;
  provider_link: '';
  token_id: string;
  token_type: '721' | '1155';
  token_uri: '';
}

interface IApiResponse {
  data: {
    nfts721: IApiItem[];
    nfts1155: IApiItem[];
  };
}

export interface IItem {
  balance: number;
  contractAddress: string;
  contractName: string;
  description?: string;
  id: number;
  hash?: string;
  image: null;
  metadata: null;
  name: null;
  ownerAddress: string;
  providerLink: string;
  tokenId: number;
  tokenType: NftType;
  tokenUri: string;
}

interface IResponse {
  nfts721: IItem[];
  nfts1155: IItem[];
}

function mapItem(item: IApiItem): IItem {
  return {
    balance: parseInt(item.balance, 10),
    contractAddress: item.contract_addr,
    contractName: item.contract_name,
    description: item.description,
    id: item.id,
    image: item.image,
    hash: item.hash,
    metadata: item.metadata,
    name: item.name,
    ownerAddress: item.owner_addr,
    providerLink: item.provider_link,
    tokenId: parseInt(item.token_id, 10),
    tokenType: item.token_type === '721' ? NftType.ERC721 : NftType.ERC1155,
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
      url: '/nft',
      method: 'get',
      params: { user_address: params.userId },
    },
    meta: {
      driver: 'nftview2',
      getData: response => mapData(response),
      ...meta,
    },
  }),
);
