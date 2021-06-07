import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
import { PoolType } from 'modules/common/api/poolType';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { ILikedItem, queryLikedItems } from './queryLikedItems';

interface IDealAccountLikeArgs {
  isLiked: boolean;
  category: string;
  poolType?: PoolType;
  itemId: number;
  poolId: number;
  requestKey?: string;
}

export const dealAccountLike = createAction<
  RequestAction<{ code: number; msg: any }, any>,
  [IDealAccountLikeArgs]
>('dealAccountLike', params => ({
  request: {
    url: '/api/v2/main/auth/dealaccountlike',
    method: 'post',
    data: {
      auctiontype: params.poolType ?? 0,
      category: params.category,
      ifLike: params.isLiked ? 1 : 0,
      itemid: params.itemId,
      poolid: params.poolId,
    },
  },
  meta: {
    requestKey: params.requestKey,
    requestsCapacity: 2,
    asMutation: true,
    auth: true,
    driver: 'axiosSmartchain',
    onRequest: (
      request,
      _action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      const { data } = getQuery<ISetAccountData>(store.getState(), {
        type: setAccount.toString(),
      });
      request.data.accountaddress = data.address;

      return request;
    },
    getData: data => {
      if (data.code !== 1) {
        return new Error(data.msg);
      }

      return data;
    },
    mutations: {
      [queryLikedItems.toString()]: (
        data: ILikedItem[] | undefined,
        response: { code: number; msg: any },
      ): ILikedItem[] | undefined => {
        if (response.code !== 1) {
          return data;
        }

        if (params.isLiked) {
          const newLikedItem = {
            itemId: params.itemId,
            poolId: params.poolId,
          } as ILikedItem;

          (data || []).push(newLikedItem);
          return data;
        } else {
          return (data || []).filter(
            likedItem =>
              likedItem.itemId !== params.itemId ||
              likedItem.poolId !== params.poolId,
          );
        }
      },
    },
  },
}));
