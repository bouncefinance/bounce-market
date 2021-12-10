import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import {
  IApiSearchDrops,
  ISearchDropsItem,
  ISearchDropsParams,
  mapSearchDropsItem,
  SearchDropsParamOrderType,
  SearchDropsParamState,
  searchDropsUrl,
} from 'modules/api/searchDrops';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { mockActive } from './mockActive';

export interface IGetDropsArgs {
  address?: string;
  limit?: number;
  offset?: number;
  ordertype?: SearchDropsParamOrderType;
  state?: SearchDropsParamState;
}

export interface IGetDrops {
  items: ISearchDropsItem[];
  total: number;
  offset: number;
  allLoaded?: boolean;
}

export const getDrops = createSmartAction<
  RequestAction<IApiSearchDrops, IGetDrops | null>,
  [IGetDropsArgs?, RequestActionMeta<IApiSearchDrops, IGetDrops>?]
>('getDrops', (params, meta) => ({
  request: {
    url: searchDropsUrl,
    method: 'post',
    data: {
      accountaddress: params?.address || '',
      limit: params?.limit || 10,
      offset: params?.offset || 0,
      ordertype: params?.ordertype || SearchDropsParamOrderType.Inverted,
      state: params?.state,
    } as ISearchDropsParams,
  },
  meta: {
    asMutation: false,
    ...meta,
    auth: false,
    driver: 'axios',
    getData: data => {
      if (data.code !== 1) {
        console.error(`
        getDrops: Unexpected response.
        To avoid this type of error notification you might need
        to look at the https://github.com/klis87/redux-requests/discussions/470
        `);
      }

      if (!data.data) {
        return null;
      }
      let resultData = data.data;
      if (params?.state === SearchDropsParamState.Live) {
        resultData = mockActive;
      }

      return {
        items: resultData.map(mapSearchDropsItem),
        total: data.total || 0,
        offset: params?.offset || 0,
        allLoaded: resultData.length < (params?.limit || 10),
      };
    },
  },
}));
