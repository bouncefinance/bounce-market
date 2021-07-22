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
  RequestAction<IApiSearchDrops, IGetDrops | null>,
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
        console.error(`
        getDrops: Unexpected response.
        To avoid this type of error notification you might need
        to look at the https://github.com/klis87/redux-requests/discussions/470
        `);
      }

      if (!data.data) {
        return null;
      }
      return {
        items: data.data.map(mapSearchDropsItem).sort((a, b) => {
          return (
            new Date(a.dropDate).getTime() - new Date(b.dropDate).getTime()
          );
        }),
        total: data.total || 0,
        offset: params?.offset || 0,
      };
    },
  },
}));
