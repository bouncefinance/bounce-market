import { createAction as createSmartAction } from 'redux-smart-actions';
import { getPools, IPoolsData } from './api/getPools';
import { IApiItem, IItem, mapItem } from './api/getItems';
import { RequestAction, RequestActionMeta } from '@redux-requests/core';

interface IFetchItemsParams {
  ids?: number[];
  category?: string;
  channel?: string;
}

export const MarketplaceActions = {
  fetchPools: createSmartAction('MarketplaceActions/fetchPools', () => ({
    request: {
      promise: (async function () {
        return await getPools();
      })(),
    },
    meta: {
      getData: (data: IPoolsData) => data,
    },
  })),
  fetchItems: createSmartAction<
    RequestAction<{ code: 1; data: IApiItem[] }, IItem[]>
  >(
    'MarketplaceActions/fetchItems',
    (
      params: IFetchItemsParams,
      meta?: RequestActionMeta<{ code: 1; data: IApiItem[] }, IItem[]>,
    ) => ({
      request: {
        url: '/api/v2/main/getitemsbyids',
        method: 'post',
        data: params,
      },
      meta: {
        auth: true,
        driver: 'axios',
        asMutation: false,
        getData: data => {
          return data.data.map(mapItem);
        },
        ...meta,
      },
    }),
  ),
};
