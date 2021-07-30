import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
import { PoolType } from 'modules/api/common/poolType';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store';

interface IDealAccountLikeArgs {
  isLiked: boolean;
  category: string;
  poolType?: PoolType;
  itemId: number;
  poolId: number;
  contractAddress: string;
  requestKey?: string;
  isItemType?: boolean;
}

export const dealAccountLike = createAction<
  RequestAction<{ code: number; msg: any }, any>,
  [IDealAccountLikeArgs]
>('dealAccountLike', params => ({
  request: {
    url: '/auth/dealaccountlike',
    method: 'post',
    data: {
      category: params.category,
      ifLike: params.isLiked ? 1 : 0,
      ...(params.isItemType
        ? {
            itemid: params.itemId,
            contractaddress: params.contractAddress,
          }
        : {
            auctiontype: params.poolType ?? 0,
            poolid: params.poolId,
          }),
    },
  },
  meta: {
    requestKey: params.requestKey,
    requestsCapacity: 2,
    asMutation: true,
    auth: true,
    driver: 'axios',
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
    // mutations: {
    //   [queryLikedItems.toString()]: (
    //     data: ILikedItem[] | undefined,
    //     response: { code: number; msg: any },
    //   ): ILikedItem[] | undefined => {
    //     if (response.code !== 1) {
    //       return data;
    //     }

    //     if (params.isLiked) {
    //       const newLikedItem = {
    //         itemId: params.itemId,
    //         poolId: params.poolId,
    //       } as ILikedItem;

    //       (data || []).push(newLikedItem);
    //       return data;
    //     } else {
    //       return (data || []).filter(
    //         likedItem =>
    //           likedItem.itemId !== params.itemId ||
    //           likedItem.poolId !== params.poolId,
    //       );
    //     }
    //   },
    // },
  },
}));
