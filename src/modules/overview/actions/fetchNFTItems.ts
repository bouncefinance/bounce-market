import {
  DispatchRequest,
  RequestAction,
  RequestActionMeta,
} from '@redux-requests/core';
import { PoolState } from 'modules/api/common/AuctionState';
import { IPoolNftItem } from 'modules/api/common/poolType';
import { UserRoleType } from 'modules/common/actions/queryAccountInfo';
import { PoolCategoryType } from 'modules/common/api/getPools';
// import { getApeContract } from 'modules/common/hooks/contractHelps';
import { INftCardHelpsParams } from 'modules/common/utils/nftCard';
import { mapPoolData } from 'modules/pools/actions/map';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store/store';
import { AuctionType } from '../../api/common/auctionType';
import { TokenSymbol } from '../../common/types/TokenSymbol';
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
  id: string;
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
  openAt: Date;
  state: PoolState;
  isLike: boolean;
  endDate: Date | undefined;
  soldAmount: number;
  supplyAmount: number;
  nftCardOption: INftCardHelpsParams;
}

interface IFetchNFTItemsArgs {
  channel: ItemsChannel;
  limit: number;
  offset?: number;
}

export interface IFetchNFTItems {
  items: IPoolNftItem[];
  offset: number;
  total: number;
  tokenSymbol: string;
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
            tokenSymbol: TokenSymbol.BNB,
          };

          const { data: poolsData } = await store.dispatchRequest(
            fetchPools(
              {
                category: '',
                channel:
                  params.channel === ItemsChannel.all ? '' : params.channel,
                // currency: getApeContract(0),
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

          const tradePools = mapPoolData(
            poolsData.data.filter(item => item.state !== 1),
          );

          queryResponse.items = tradePools;
          queryResponse.total = poolsData.total ?? 0;
          if (poolsData.tokenSymbol) {
            queryResponse.tokenSymbol = poolsData.tokenSymbol;
          }

          return queryResponse;
        })(),
      };
    },
  },
}));
