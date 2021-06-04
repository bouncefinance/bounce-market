import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { IApiItem, IItem, mapItem } from '../api/getItems';

interface IFetchItemsParams {
  ids?: number[];
  category?: string;
  channel?: string;
}

export const fetchItemsByIds = createSmartAction<
  RequestAction<{ code: 0 | 1; msg?: string; data: IApiItem[] }, IItem[]>
>(
  'MarketplaceActions/fetchItems',
  (
    params: IFetchItemsParams,
    meta?: RequestActionMeta<
      { code: 0 | 1; msg?: string; data: IApiItem[] },
      IItem[]
    >,
  ) => ({
    request: {
      url: '/api/v2/main/getitemsbyids',
      method: 'post',
      data: params,
    },
    meta: {
      auth: true,
      driver: 'axiosSmartchain',
      asMutation: false,
      getData: data => {
        if (data.code === 0 && data.msg) {
          throw new Error(data.msg);
        }
        return data.data.map(mapItem);
      },
      ...meta,
    },
  }),
);
