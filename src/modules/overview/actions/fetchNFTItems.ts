import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { ZERO_ADDRESS } from 'modules/common/conts';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store/store';
import { AuctionType } from '../api/auctionType';
import {
  fetchItemsByFilter,
  IItemByFilter,
  ItemsChannel,
  NFTCategoryType,
} from './fetchItemsByFilter';
import { fetchPools } from './fetchPools';

export interface INFTItem {
  category?: IItemByFilter['category'];
  channel?: string;
  contractaddress?: string;
  createTime: number;
  created_at?: string;
  description?: string;
  externallink?: string;
  fileurl?: string;
  id?: number;
  itemname?: string;
  itemsymbol?: string;
  likecount?: number;
  litimgurl?: string;
  metadata?: string;
  owneraddress?: string;
  poolId?: number;
  poolType: AuctionType;
  price: string;
  standard?: number;
  supply?: number;
  token1: string;
}

interface IFetchNFTItemsArgs {
  channel?: ItemsChannel;
  count?: number;
  offset?: number;
  address?: string;
}

export const fetchNFTItems = createSmartAction<
  RequestAction<any, INFTItem[]>,
  [IFetchNFTItemsArgs?]
>('NFTMarket/fetchNFTItems', params => ({
  request: {
    promise: (async function () {})(),
  },
  meta: {
    onRequest: (
      _request: { promise: Promise<any> },
      _action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async () => {
          const { data: poolsData } = await store.dispatchRequest(
            fetchPools(
              {
                category: '',
                channel: 'FineArts',
                currency: ZERO_ADDRESS,
                limit: 10,
                offset: 0,
                orderfield: 1,
              },
              {
                asMutation: true,
              },
            ),
          );
          if (!poolsData) {
            return [];
          }

          // const tradePools = (poolsData.tradePools || [])
          //   .map(item => ({
          //     ...item,
          //     poolType: AuctionType.FixedSwap,
          //   }))
          //   .filter(item => item.state !== 1);

          // const tradeAuctions = (poolsData.tradeAuctions || [])
          //   .map(item => ({
          //     ...item,
          //     price:
          //       item.lastestBidAmount !== '0'
          //         ? item.lastestBidAmount
          //         : item.amountMin1,
          //     poolType: AuctionType.EnglishAuction,
          //   }))
          //   .filter(item => item.state !== 1 && item.poolId !== 0);

          const tradePools = (poolsData || [])
            .map(item => ({
              ...item,
              poolType:
                item.pooltype === 1
                  ? AuctionType.FixedSwap
                  : AuctionType.EnglishAuction,
            }))
            .filter(item => item.state !== 1);

          const list = tradePools.map(item => item.tokenid);
          const ctsList = tradePools.map(item => item.token0);

          const { data: itemsByFilterData } = await store.dispatchRequest(
            fetchItemsByFilter(
              {
                ids: list,
                cts: ctsList,
                channel: params?.channel || ItemsChannel.fineArts,
                category: NFTCategoryType.default,
              },
              {
                asMutation: true,
              },
            ),
          );

          if (!itemsByFilterData) {
            return [];
          }
          const mappedItems: INFTItem[] = tradePools
            .map(pool => {
              const poolInfo = itemsByFilterData.find(
                r => r.id === pool.tokenid,
              );
              return {
                ...poolInfo,
                category: poolInfo?.category,
                poolType: pool.poolType,
                poolId: pool.poolid,
                price: pool.price,
                createTime: new Date(pool.created_at).getTime(),
                token1: pool.token1,
              };
            })
            .filter(item => item.fileurl)
            .sort(
              (a, b) =>
                new Date(b.createTime).getTime() -
                new Date(a.createTime).getTime(),
            );

          return mappedItems;
        })(),
      };
    },
  },
}));
