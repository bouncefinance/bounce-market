import { DispatchRequest, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { throwIfDataIsEmptyOrError } from 'modules/common/utils/throwIfDataIsEmptyOrError';
import { fetchPools } from 'modules/overview/actions/fetchPools';
import { AuctionType } from 'modules/overview/api/auctionType';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store';
import Web3 from 'web3';
import { getAccountLikes, IAccountLike } from './getAccountLikes';

export interface ILikedItem extends IAccountLike {
  poolType: AuctionType;
  price: BigNumber;
  createTime: string;
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
                const poolInfo = pools.find(
                  pool =>
                    pool.tokenid === accountLike.itemId &&
                    pool.poolid === accountLike.poolId,
                );
                if (!poolInfo) {
                  return null;
                } else {
                  return {
                    ...accountLike,
                    poolType: poolInfo.pooltype as any,
                    price: new BigNumber(Web3.utils.fromWei(poolInfo.price)),
                    createTime: poolInfo.created_at,
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
