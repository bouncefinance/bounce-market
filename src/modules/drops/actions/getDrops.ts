import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import {
  IApiSearchDrops,
  IApiSearchDropsItem,
  ISearchDropsItem,
  ISearchDropsParams,
  mapSearchDropsItem,
  SearchDropsParamOrderType,
  SearchDropsParamState,
  searchDropsUrl,
} from 'modules/api/searchDrops';
import { createAction as createSmartAction } from 'redux-smart-actions';

interface IGetDropsArgs {
  address?: string;
  limit?: number;
  offset?: number;
  ordertype?: SearchDropsParamOrderType;
  state?: SearchDropsParamState;
}

export const getDrops = createSmartAction<
  RequestAction<IApiSearchDrops, ISearchDropsItem[]>,
  [IGetDropsArgs?, RequestActionMeta<IApiSearchDrops, ISearchDropsItem[]>?]
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
        throw new Error('Unexpected response');
      }
      return (data.data as IApiSearchDropsItem[]).map(mapSearchDropsItem);
    },
  },
}));
