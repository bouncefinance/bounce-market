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
  RequestAction<IApiSearchDrops, IGetDrops>,
  [IGetDropsArgs?, RequestActionMeta<IApiSearchDrops, IGetDrops>?]
>('getDrops', (params, meta) => ({
  request: {
    url: searchDropsUrl,
    method: 'post',
    data: {
      accountaddress: params?.address || '',
      limit: params?.limit || 1000,
      offset: params?.offset || 0,
      ordertype: params?.ordertype || SearchDropsParamOrderType.Positive,
      state: params?.state || SearchDropsParamState.Live,
    } as ISearchDropsParams,
  },
  meta: {
    asMutation: false,
    ...meta,
    auth: false,
    driver: 'axios',
    getData: data => {
      if (data.code !== 1) {
        console.error('getDrops: Unexpected response');
      }

      return {
        items: (data.data || []).map(mapSearchDropsItem),
        total: data.total || 0,
        offset: params?.offset || 0,
      };
    },
  },
}));
