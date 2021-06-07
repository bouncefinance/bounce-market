import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { IApiItem, IItem, mapItem } from '../../overview/api/getItems';

const EXCLUDED_NAME = 'Untitled (External import)';

interface IFetchItemsParams {
  ids?: number[];
  cts?: string[];
  category?: string;
  channel?: string;
}

export const fetchItemsByFilter = createSmartAction<
  RequestAction<{ code: 0 | 1; msg?: string; data: IApiItem[] }, IItem[]>,
  [
    IFetchItemsParams,
    RequestActionMeta<
      { code: 0 | 1; msg?: string; data: IApiItem[] },
      IItem[]
    >?,
  ]
>('MarketplaceActions/fetchItems', (params: IFetchItemsParams, meta) => ({
  request: {
    url: '/api/v2/main/getitemsbyfilter',
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
      return data.data
        .map(mapItem)
        .filter(item => item.fileUrl && item.itemName !== EXCLUDED_NAME);
    },
    ...meta,
  },
}));
