import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
import { AuctionType } from 'modules/overview/api/auctionType';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { getAccountLikes, ILikedItem } from './getAccountLikes';

interface IDealAccountLikeArgs {
  isLiked: boolean;
  category: string;
  auctionType?: AuctionType;
  itemId?: number;
  poolId?: number;
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
      auctiontype: params.auctionType === AuctionType.EnglishAuction ? 1 : 0,
      category: params.category,
      ifLike: params.isLiked ? 1 : 0,
      itemid: params.itemId || 0,
      poolid: params.poolId || 0,
    },
  },
  meta: {
    requestKey: params.requestKey,
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
    mutations: {
      [getAccountLikes.toString()]: (
        data: ILikedItem[] | undefined,
        response: { code: number; msg: any },
      ): ILikedItem[] | undefined => {
        if (response.code !== 1) {
          return data;
        }

        if (params.isLiked) {
          const newLikedItem = {
            itemid: params.itemId,
          } as ILikedItem;

          (data || []).push(newLikedItem);
          return data;
        } else {
          return (data || []).filter(
            likedItem => likedItem.itemid !== params.itemId,
          );
        }
      },
    },
  },
}));
