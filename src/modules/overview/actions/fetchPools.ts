import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { IGetPools, IGetPoolsApi } from 'modules/common/api/getPools';
import { createAction as createSmartAction } from 'redux-smart-actions';

export const fetchPools = createSmartAction<
  RequestAction<IGetPoolsApi, IGetPools>,
  [
    {
      user?: string;
      offset?: number;
      count?: number;
    }?,
    RequestActionMeta<IGetPoolsApi, IGetPools>?,
  ]
>('NFTMarket/fetchPools', (params, meta) => ({
  request: {
    url: '/pools',
    method: 'get',
    params: {
      user_address: params?.user,
      offset: params?.offset || 0,
      count: params?.count || 100,
    },
  },
  meta: {
    driver: 'nftview',
    getData: response => {
      if (response.code !== 200) {
        throw new Error(response.msg);
      }

      return response.data;
    },
    ...meta,
  },
}));
