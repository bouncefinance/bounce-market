import { createAction as createSmartAction } from 'redux-smart-actions';
import { getPools, IPoolsData } from './api/getPools';
import { IApiItem } from './api/getItems';

interface IFetchItemsParams {
  ids?: number[];
  category?: string;
  channel?: string;
}

export const MarketplaceActions = {
  fetchPools: createSmartAction('FETCH_POOLS', () => ({
    request: {
      promise: (async function () {
        return await getPools();
      })(),
    },
    meta: {
      getData: (data: IPoolsData) => data,
    },
  })),
  fetchItems: createSmartAction('FETCH_ITEMS', (params: IFetchItemsParams) => ({
    request: {
      url: '/api/v2/main/getitemsbyfilter',
      method: 'post',
      data: params,
    },
    getData: (data: { data: IApiItem }) => data.data,
    meta: {
      auth: true,
      driver: 'axios',
      asMutation: false,
    },
  })),
};
