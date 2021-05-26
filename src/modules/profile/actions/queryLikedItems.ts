import { DispatchRequest, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { throwIfDataIsEmptyOrError } from 'modules/common/utils/throwIfDataIsEmptyOrError';
import { fetchPools } from 'modules/overview/actions/fetchPools';
import { AuctionType } from 'modules/overview/api/auctionType';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { getAccountLikes, IAccountLike } from './getAccountLikes';

export interface ILikedItem extends IAccountLike {
  poolType: AuctionType;
  price: BigNumber;
  createTime: number;
  token1: string;
}

export const queryLikedItems = createAction<RequestAction<any, ILikedItem[]>>(
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
            const { data: poolsData } = throwIfDataIsEmptyOrError(
              await store.dispatchRequest(
                fetchPools(
                  {
                    count: 1000,
                  },
                  {
                    asMutation: true,
                  },
                ),
              ),
            );

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

            const { data: accountLikes } = throwIfDataIsEmptyOrError(
              await store.dispatchRequest(getAccountLikes()),
            );

            const likedItems = accountLikes
              .map(accountLike => {
                const poolInfo = pools.find(
                  pool =>
                    pool.tokenId === accountLike.itemId &&
                    pool.poolId === accountLike.poolId,
                );
                if (!poolInfo) {
                  return null;
                } else {
                  return {
                    ...accountLike,
                    poolType: poolInfo.poolType,
                    price: new BigNumber(poolInfo.price),
                    createTime: poolInfo.createTime,
                    token1: poolInfo.token1,
                  };
                }
              })
              // filter out the null elements
              .filter(e => e) as ILikedItem[];

            return likedItems;
          })(),
        };
      },
    },
  }),
);
