import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { AuctionType } from 'modules/api/common/auctionType';
import { ZERO_ADDRESS } from 'modules/common/conts';
import {
  fetchItemsByFilter,
  ItemsChannel,
} from 'modules/overview/actions/fetchItemsByFilter';
import { INFTItem } from 'modules/overview/actions/fetchNFTItems';
import { fetchPools } from 'modules/overview/actions/fetchPools';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store/store';
import { TokenSymbol } from '../../common/types/TokenSymbol';

interface IQueryBrandNftsArgs {
  userAddress: string;
  contractAddress: string;
  channel?: ItemsChannel;
  count?: number;
  offset?: number;
}

export const queryBrandNfts = createAction<
  RequestAction<any, INFTItem[]>,
  [IQueryBrandNftsArgs]
>('queryBrandNfts', params => ({
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
                channel: params?.channel || 'FineArts',
                currency: ZERO_ADDRESS,
                limit: 1000,
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

          const tradePools = (poolsData.data || [])
            .map(item => ({
              ...item,
              poolType:
                item.pooltype === 1
                  ? AuctionType.FixedSwap
                  : AuctionType.EnglishAuction,
            }))
            .filter(
              item =>
                item.state !== 1 &&
                String(item.token0).toLowerCase() ===
                  String(params.contractAddress).toLowerCase(),
            );

          const pools = tradePools;
          const list = pools.map(item => item.tokenid);
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

          const mappedItems = pools
            .map(pool => {
              const poolInfo = itemsByFilterData.find(
                r => r.id === pool.tokenid,
              );
              if (!poolInfo) {
                return null;
              }
              return {
                ...poolInfo,
                category: poolInfo?.category,
                poolType: pool.poolType,
                poolId: pool.poolid,
                price: pool.price,
                createTime: new Date(pool.created_at).getTime(),
                token1: pool.token0,
                tokenSymbol: poolInfo ? poolInfo.tokenSymbol : TokenSymbol.BNB,
              };
            })
            .filter(item => item && item.itemname) as INFTItem[];

          mappedItems.sort((a, b) => b.createTime - a.createTime);

          return mappedItems;
        })(),
      };
    },
  },
}));
