import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { fetchPools } from 'modules/overview/actions/fetchPools';
import { AuctionType } from 'modules/overview/api/auctionType';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { getAccountLikes } from './getAccountLikes';

export const queryLikedItems = createAction<RequestAction>(
  'queryLikedItems',
  () => ({
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
                  count: 1000,
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
              .filter(item => item.state !== 1);

            const pools = [...tradePools, ...tradeAuctions];

            const { data: accountLikes } = await store.dispatchRequest(
              getAccountLikes(),
            );

            if (!accountLikes) {
              return [];
            }

            const mappedItems = accountLikes
              .map(item => {
                const poolInfo = pools.find(
                  pool =>
                    pool.tokenId === item.itemid && pool.poolId === item.poolid,
                );
                if (!poolInfo) {
                  return null;
                } else {
                  return {
                    ...poolInfo,
                    poolType: poolInfo.poolType,
                    poolId: poolInfo.poolId,
                    price: poolInfo.price,
                    createTime: poolInfo.createTime,
                    token1: poolInfo.token1,
                  };
                }
              })
              .filter(e => e);

            return mappedItems;
          })(),
        };
      },
    },
  }),
);
