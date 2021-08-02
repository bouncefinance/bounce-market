import {
  DispatchRequest,
  getQuery,
  RequestAction,
  RequestActionMeta,
} from '@redux-requests/core';
import { Store } from '@reduxjs/toolkit';
import { setAccount } from 'modules/account/store/actions/setAccount';
import { IGetPoolsApi_V2 } from 'modules/common/api/getPools';
import { ZERO_ADDRESS } from 'modules/common/conts';
import { addTokenSymbolByDriver } from 'modules/common/utils/addTokenSymbolByDriver';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store/store';

export enum FetchStateType {
  All = 2,
  Live = 0,
  Close = 1,
}

export const fetchPools = createSmartAction<
  RequestAction<IGetPoolsApi_V2, IGetPoolsApi_V2>,
  [
    {
      category?: string;
      channel?: string;
      currency?: string;
      limit?: number;
      offset?: number;
      orderfield?: number;
      state?: FetchStateType;
    }?,
    RequestActionMeta<IGetPoolsApi_V2, IGetPoolsApi_V2>?,
  ]
>('NFTMarket/fetchPools', (params, meta) => ({
  request: {
    url: '/getauctionpoolsbypage',
    method: 'post',
    data: {
      category: params?.category || '',
      channel: params?.channel,
      currency: params?.currency || ZERO_ADDRESS,
      limit: params?.limit || 10,
      offset: params?.offset || 0,
      orderfield: params?.orderfield || 1,
      state: params?.state === undefined ? FetchStateType.All : params?.state,
    },
  },
  meta: {
    driver: 'axios',
    onRequest: (
      request: any,
      action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      const { data } = getQuery(store.getState(), {
        type: setAccount.toString(),
        action: setAccount,
      });
      request.data.accountaddress = data?.address;
      return request;
    },
    getData: response => {
      if (response.code !== 1) {
        throw new Error(response.msg);
      }

      return response;
    },
    onSuccess: addTokenSymbolByDriver,
    ...meta,
  },
}));
