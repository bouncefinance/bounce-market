import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store';

interface IDealAccountLikeArgs {
  isLiked: boolean;
  category: string;
  itemId: string;
  contractAddress: string;
  requestKey?: string;
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
      itemid: params.itemId,
      contractaddress: params.contractAddress,
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
      if (data.code !== 200) {
        return new Error(data.msg);
      }

      return data;
    },
  },
}));
