import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import {
  IApiSearchDrops,
  IApiSearchDropsItem,
  ISearchDropsParams,
  mapSearchDropsItem,
  SearchDropsParamOrderType,
  SearchDropsParamState,
  searchDropsUrl,
} from 'modules/api/searchDrops';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { getDrops, IGetDrops, IGetDropsArgs } from './getDrops';

interface IUpdateDropsArgs extends Omit<IGetDropsArgs, 'limit' | 'offset'> {
  limit: number;
  offset: number;
}

export const updateDrops = createSmartAction<
  RequestAction<IApiSearchDrops, IGetDrops>,
  [IUpdateDropsArgs, RequestActionMeta<IApiSearchDrops, IGetDrops>?]
>('updateDrops', (params, meta) => ({
  request: {
    url: searchDropsUrl,
    method: 'post',
    data: {
      accountaddress: params?.address || '',
      limit: params.limit || 1000,
      offset: params.offset || 0,
      ordertype: params?.ordertype || SearchDropsParamOrderType.Positive,
      state: params?.state || SearchDropsParamState.Live,
    } as ISearchDropsParams,
  },
  meta: {
    asMutation: true,
    auth: false,
    driver: 'axios',
    getData: data => {
      if (data.code !== 1) {
        throw new Error('Unexpected response');
      }

      const items = (data.data as IApiSearchDropsItem[]).map(
        mapSearchDropsItem,
      );

      return {
        items,
        total: data.total || 0,
        offset: params.offset,
        allLoaded: !items.length || items.length < params.limit,
      };
    },
    mutations: {
      [`${getDrops.toString()}${meta?.requestKey}`]: (
        data: IGetDrops,
        mutationData: IGetDrops,
      ) => {
        return {
          ...mutationData,
          items: [...data.items, ...mutationData.items],
        };
      },
    },
    ...meta,
  },
}));
