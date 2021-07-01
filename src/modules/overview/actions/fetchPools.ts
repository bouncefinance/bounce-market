import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { IGetPoolsApi_V2} from 'modules/common/api/getPools';
import { ZERO_ADDRESS } from 'modules/common/conts';
import { createAction as createSmartAction } from 'redux-smart-actions';

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
    RequestActionMeta<IGetPoolsApi_V2, IGetPoolsApi_V2>?
  ]
>('NFTMarket/fetchPools', (params, meta) => ({
  request: {
    url: '/api/v2/main/getauctionpoolsbypage',
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
    getData: response => {
      if (response.code !== 1) {
        throw new Error(response.msg);
      }

      return response;
    },
    ...meta,
  },
}));
