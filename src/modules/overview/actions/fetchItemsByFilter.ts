import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import { TokenSymbol } from '../../common/types/TokenSymbol';
import { addTokenSymbolToArrayByDriver } from '../../common/utils/addTokenSymbolToArrayByDriver';

export enum ItemsChannel {
  all = 'All',
  fineArts = 'FineArts',
  sports = 'Sports',
  comics = 'Comics',
  collectible = 'Collectible',
  music = 'Music',
  performer = 'Performer',
  metaverse = 'Metaverse',
  games = 'Games',
}

export enum NFTCategoryType {
  video = 'video',
  image = 'image',
  model = '3D',
  default = '',
}

export interface IItemByFilter {
  category: NFTCategoryType;
  channel: string;
  contractaddress: string;
  created_at: string;
  description: string;
  externallink: string;
  fileurl: string;
  id: string;
  itemname: string;
  itemsymbol: string;
  likecount: number;
  litimgurl: string;
  metadata: string;
  owneraddress: string;
  standard: number;
  supply: number;
  tokenSymbol: TokenSymbol;
  mylikecount?: number;
  identity: number;
}

interface IApiFetchItemsByFilter {
  code: number;
  data: IItemByFilter[];
  msg?: string;
}

interface IFetchItemsByFilterArgs {
  ids: string[];
  cts: string[];
  category?: NFTCategoryType;
  channel: ItemsChannel;
}

export const fetchItemsByFilter = createAction<
  RequestAction<IApiFetchItemsByFilter, IItemByFilter[]>,
  [
    IFetchItemsByFilterArgs,
    RequestActionMeta<IApiFetchItemsByFilter, IItemByFilter[]>?,
  ]
>('NFTMarket/fetchItemsByFilter', (params, meta) => ({
  request: {
    url: '/getitemsbyfilter',
    method: 'post',
    data: {
      ...params,
      channel: params.channel === ItemsChannel.all ? undefined : params.channel,
    },
  },
  meta: {
    auth: true,
    driver: 'axios',
    getData: response => {
      if (response.code !== 1) {
        throw new Error(response.msg);
      }

      return response.data;
    },
    onSuccess: addTokenSymbolToArrayByDriver,
    ...meta,
  },
}));
