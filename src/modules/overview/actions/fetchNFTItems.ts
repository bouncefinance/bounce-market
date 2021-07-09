import {
  DispatchRequest,
  RequestAction,
  RequestActionMeta,
} from '@redux-requests/core';
import {
  queryAccountInfo,
  UserRoleType,
} from 'modules/common/actions/queryAccountInfo';
import { ITradePool_V2, PoolCategoryType } from 'modules/common/api/getPools';
import { ZERO_ADDRESS } from 'modules/common/conts';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store/store';
import { TokenSymbol } from '../../common/types/TokenSymbol';
import { AuctionType } from '../api/auctionType';
import { ItemsChannel } from './fetchItemsByFilter';
import { fetchPools, FetchStateType } from './fetchPools';

export interface INFTItem {
  category?: PoolCategoryType;
  channel?: string;
  contractaddress?: string;
  createTime: number;
  created_at?: string;
  description?: string;
  externallink?: string;
  fileurl?: string;
  id: number;
  itemname?: string;
  itemsymbol?: string;
  likecount?: number;
  litimgurl?: string;
  metadata?: string;
  owneraddress: string;
  poolId: number;
  poolType: AuctionType;
  price: string;
  standard?: number;
  supply?: number;
  ownerAvatar?: string;
  identity?: UserRoleType;
  ownerName?: string;
  token1: string;
  tokenSymbol: TokenSymbol;
}

export const mapNFTItem = (item: ITradePool_V2): INFTItem => {
  return {
    category: item.category,
    channel: item.channel,
    contractaddress: item.token0,
    createTime: new Date(item.created_at).getTime(),
    created_at: item.created_at,
    description: 'description',
    externallink: 'externallink',
    fileurl: item.fileurl,
    id: item.tokenid,
    itemname: item.itemname,
    itemsymbol: 'itemsymbol',
    likecount: item.likecount,
    litimgurl: item.creatorurl,
    metadata: 'metadata',
    owneraddress: item.creator,
    poolId: item.poolid,
    poolType:
      item.pooltype === 1 ? AuctionType.FixedSwap : AuctionType.EnglishAuction,
    price: item.price,
    standard: 0,
    supply: 100,
    token1: item.token1,
    // TODO: hardcoded. Get token symbol from API
    tokenSymbol: TokenSymbol.BNB,
  };
};

interface IFetchNFTItemsArgs {
  channel: ItemsChannel;
  limit: number;
  offset?: number;
}

export interface IFetchNFTItems {
  items: INFTItem[];
  offset: number;
  total: number;
}

export type FetchNFTItemsMetaType = RequestActionMeta<any, IFetchNFTItems>;

export const fetchNFTItems = createSmartAction<
  RequestAction<any, IFetchNFTItems>,
  [IFetchNFTItemsArgs, FetchNFTItemsMetaType?]
>('NFTMarket/fetchNFTItems', (params, meta) => ({
  request: {
    promise: (async function () {})(),
  },
  meta: {
    ...meta,
    onRequest: (
      _request: { promise: Promise<any> },
      _action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async () => {
          const queryResponse: IFetchNFTItems = {
            items: [],
            offset: params.offset ?? 0,
            total: 0,
          };

          const { data: poolsData } = await store.dispatchRequest(
            fetchPools(
              {
                category: '',
                channel: params.channel,
                currency: ZERO_ADDRESS,
                limit: params.limit,
                offset: params.offset,
                orderfield: 1,
                state: FetchStateType.Live,
              },
              {
                silent: true,
              },
            ),
          );

          if (!poolsData) {
            return queryResponse;
          }

          const tradePools = poolsData.data
            .filter(item => item.state !== 1)
            .map(mapNFTItem);

          const tradePoolsWithOwnerImg: INFTItem[] = await Promise.all(
            tradePools.map(async item => {
              const response = await store.dispatchRequest(
                queryAccountInfo(
                  { accountAddress: item.owneraddress },
                  { requestKey: `${item.poolId}`, silent: true },
                ),
              );

              return {
                ...item,
                ownerAvatar: response.data?.imgUrl,
                ownerName: response.data?.username,
                identity: response.data?.identity,
              };
            }),
          );

          queryResponse.items = tradePoolsWithOwnerImg;
          queryResponse.total = poolsData.total;

          return queryResponse;
        })(),
      };
    },
  },
}));
