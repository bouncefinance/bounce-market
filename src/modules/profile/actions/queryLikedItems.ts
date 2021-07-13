import { DispatchRequest, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { PoolType } from 'modules/api/common/poolType';
import { throwIfDataIsEmptyOrError } from 'modules/common/utils/throwIfDataIsEmptyOrError';
import { fetchPools } from 'modules/overview/actions/fetchPools';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store';
import Web3 from 'web3';
import { getAccountLikes, IAccountLike } from './getAccountLikes';

export interface ILikedItem extends IAccountLike {
  poolType: PoolType;
  price: BigNumber;
  createTime: string;
  token1: string;
  likes: number;
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
            const { data: pools } = throwIfDataIsEmptyOrError(
              await store.dispatchRequest(
                fetchPools(
                  {
                    limit: 1000,
                  },
                  {
                    asMutation: true,
                  },
                ),
              ),
            );

            const { data: accountLikes } = throwIfDataIsEmptyOrError(
              await store.dispatchRequest(getAccountLikes()),
            );

            const likedItems = accountLikes
              .map(accountLike => {
                const poolInfo = pools.data.find(
                  pool =>
                    pool.tokenid === accountLike.itemId &&
                    pool.poolid === accountLike.poolId,
                );
                if (!poolInfo) {
                  return null;
                } else {
                  return {
                    ...accountLike,
                    accountAddress: poolInfo.creator,
                    poolType: accountLike.auctionType,
                    price: new BigNumber(Web3.utils.fromWei(poolInfo.price)),
                    createTime: poolInfo.created_at,
                    token1: poolInfo.token1,
                    likes: poolInfo.likecount,
                  } as ILikedItem;
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
