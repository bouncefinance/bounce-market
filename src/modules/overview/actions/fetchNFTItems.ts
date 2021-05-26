import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store/store';
import { AuctionType } from '../api/auctionType';
import {
  fetchItemsByFilter,
  IItemByFilter,
  ItemsChannel,
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
  id: number;
  itemname?: string;
  itemsymbol?: string;
  likecount?: number;
  litimgurl?: string;
  metadata?: string;
  owneraddress?: string;
  poolId: number;
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
                offset: params?.offset,
                count: params?.count,
                user: params?.address,
              },
              {
                asMutation: true,
              },
            ),
          );

          if (!poolsData) {
            return [];
          }

          const tradePools = (poolsData.tradePools || [])
            .map(item => ({
              ...item,
              poolType: AuctionType.FixedSwap,
            }))
            .filter(item => item.state !== 1);

          const tradeAuctions = (poolsData.tradeAuctions || [])
            .map(item => ({
              ...item,
              price:
                item.lastestBidAmount !== '0'
                  ? item.lastestBidAmount
                  : item.amountMin1,
              poolType: AuctionType.EnglishAuction,
            }))
            .filter(item => item.state !== 1 && item.poolId !== 0);

          const pools = [...tradePools, ...tradeAuctions];
          const list = pools.map(item => item.tokenId);
          const ctsList = pools.map(item => item.token0);

          const { data: itemsByFilterData } = await store.dispatchRequest(
            fetchItemsByFilter(
              {
                ids: list,
                cts: ctsList,
                channel: params?.channel || ItemsChannel.fineArts,
              },
              {
                asMutation: true,
              },
            ),
          );

          if (!itemsByFilterData) {
            return [];
          }

          const mappedItems: INFTItem[] = pools
            .map(pool => {
              const poolInfo = itemsByFilterData.find(
                r => r.id === pool.tokenId,
              ) as IItemByFilter;
              return {
                ...poolInfo,
                category: poolInfo?.category,
                poolType: pool.poolType,
                poolId: pool.poolId,
                price: pool.price,
                createTime: pool.createTime,
                token1: pool.token1,
              };
            })
            .filter(item => item.fileurl)
            .sort((a, b) => b.createTime - a.createTime);

          return mappedItems;
        })(),
      };
    },
  },
}));
