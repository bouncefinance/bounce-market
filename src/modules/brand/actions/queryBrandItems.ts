import { createAction as createSmartAction } from 'redux-smart-actions';
import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from 'store';
import {
  QueryBrandItems1155Action,
  QueryBrandItems721Action,
  QueryBrandItemsAction,
} from './const';

export interface IBrandItem {
  user_address: string;
  contract_address: string;
}

export const queryBrandItem721 = createSmartAction(
  QueryBrandItems721Action,
  (data: IBrandItem) => {
    return {
      request: {
        url: `/erc721?user_address=${data.user_address}&contract_address=${data.contract_address}`,
        method: 'get',
      },
      meta: {
        driver: 'nftview2',
        asMutation: true,
        getData: (data: any) => {
          if (data.code !== 200) {
            throw new Error('Unexpected response');
          }
          return data.data.tokens;
        },
      },
    };
  },
);

export const queryBrandItem1155 = createSmartAction(
  QueryBrandItems1155Action,
  (data: IBrandItem) => {
    return {
      request: {
        url: `/erc1155?user_address=${data.user_address}&contract_address=${data.contract_address}`,
        method: 'get',
      },
      meta: {
        driver: 'nftview2',
        asMutation: true,
        getData: (data: any) => {
          if (data.code !== 200) {
            throw new Error('Unexpected response');
          }
          return data.data.tokens;
        },
      },
    };
  },
);

export const queryBrandItems = createSmartAction(
  QueryBrandItemsAction,
  (data: IBrandItem) => ({
    request: {
      promise: (async function () {})(),
    },
    meta: {
      asMutation: true,
      onRequest: (
        request: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: (async () => {
            const { data: items721 } = await store.dispatchRequest(
              queryBrandItem721(data),
            );
            const { data: items1155 } = await store.dispatchRequest(
              queryBrandItem1155(data),
            );
            const length = items721.length + items1155.length;
            return new Promise(resolve => resolve(length));
          })(),
        };
      },
    },
  }),
);
