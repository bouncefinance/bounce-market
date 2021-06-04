import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { ITradePool_V2, IGetPoolsApi_V2 } from 'modules/common/api/getPools';
import { API_BASE, ZERO_ADDRESS } from 'modules/common/conts';
import { createAction as createSmartAction } from 'redux-smart-actions';

export const fetchPools = createSmartAction<
  RequestAction<IGetPoolsApi_V2, ITradePool_V2[]>,
  [
    {
      // user?: string;
      // offset?: number;
      // count?: number;
      category: string;
      channel: string;
      currency: string;
      limit: number;
      offset: number;
      orderfield: number;
    }?,
    RequestActionMeta<IGetPoolsApi_V2, ITradePool_V2[]>?,
  ]
>('NFTMarket/fetchPools', (params, meta) => ({
  request: {
    url: '/api/v2/main/getauctionpoolsbypage',
    method: 'post',
    baseURL: API_BASE,
    data: {
      category: params?.category || '',
      channel: params?.channel || 'FineArts',
      currency: params?.currency || ZERO_ADDRESS,
      limit: params?.limit || 10,
      offset: params?.offset || 0,
      orderfield: params?.orderfield || 1,
    },
  },
  meta: {
    driver: 'axiosSmartchain',
    getData: response => {
      if (response.code !== 1) {
        throw new Error(response.msg);
      }

      return response.data;
    },
    ...meta,
  },
}));
