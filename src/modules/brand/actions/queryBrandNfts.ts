import { DispatchRequest, RequestAction } from '@redux-requests/core';
import {
  fetchItemsByFilter,
  ItemsChannel,
} from 'modules/overview/actions/fetchItemsByFilter';
import { INFTItem } from 'modules/overview/actions/fetchNFTItems';
import { fetchPools } from 'modules/overview/actions/fetchPools';
import { AuctionType } from 'modules/overview/api/auctionType';
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
                offset: params.offset,
                count: params.count,
                user: params.userAddress,
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
            .filter(
              item =>
                item.state !== 1 &&
                String(item.token0).toLowerCase() ===
                  String(params.contractAddress).toLowerCase(),
            );

          const tradeAuctions = (poolsData.tradeAuctions || [])
            .map(item => ({
              ...item,
              price:
                item.lastestBidAmount !== '0'
                  ? item.lastestBidAmount
                  : item.amountMin1,
              poolType: AuctionType.EnglishAuction,
            }))
            .filter(
              item =>
                item.state !== 1 &&
                String(item.token0).toLowerCase() ===
                  String(params.contractAddress).toLowerCase(),
            );

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
              const item = itemsByFilterData.find(r => r.id === pool.tokenId);
              return {
                ...item,
                category: item?.category,
                poolType: pool.poolType,
                poolId: pool.poolId,
                price: pool.price,
                createTime: pool.createTime,
                token1: pool.token1,
                tokenSymbol: item ? item.tokenSymbol : TokenSymbol.BNB,
              };
            })
            .filter(item => item.itemname)
            .sort((a, b) => b.createTime - a.createTime);

          return mappedItems;
        })(),
      };
    },
  },
}));
