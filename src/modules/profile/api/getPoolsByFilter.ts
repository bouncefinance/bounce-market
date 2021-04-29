import { createAction } from 'redux-smart-actions';
import { RequestAction, RequestActionMeta } from '@redux-requests/core';

interface IApiPoolsData {
  code: 200;
  data: {
    englishTotal: 0;
    fixedSwapTotal: 0;
    tradeAuctions: null;
    tradePools: null;
  };
  englishTotal: 0;
  fixedSwapTotal: 0;
  tradeAuctions: null;
  tradePools: null;
  msg: 'ok';
}

interface IPoolsData {
  tradePools: [];
  tradeAuctions: [];
}

export const getPoolsByFilter = createAction<
  RequestAction<IApiPoolsData, IPoolsData>,
  [
    {
      user?: string;
    }?,
    RequestActionMeta<IApiPoolsData, IPoolsData>?,
  ]
>('getPoolsByFilter', (params, meta) => ({
  request: {
    url: 'https://api1-bsc.fangible.com/v1/bsc_test/pools',
    method: 'get',
    params: { user_address: params?.user, offset: 0, count: 100 },
  },
  meta: {
    driver: 'axios',
    getData: response => {
      // TODO parse the response
      if (response.code !== 200) {
        throw new Error(response.msg);
      }

      return { tradePools: [], tradeAuctions: [] };
    },
    ...meta,
  },
}));
