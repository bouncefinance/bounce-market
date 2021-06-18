import {
  DispatchRequest,
  RequestAction,
  RequestActionMeta,
} from '@redux-requests/core';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { IBrandInfo } from '../api/queryBrand';
import { getAccountBrand } from './getAccountBrand';
import { queryBrandItems } from './queryBrandItems';

export interface IMyBrand {
  id: number;
  title: string;
  imgSrc: string;
  itemsCount: number;
}

export const queryMyBrandItem = createSmartAction<
  RequestAction<IMyBrand[], IMyBrand[]>,
  [string, RequestActionMeta<any, IMyBrand[]>?]
>('queryMyBrandItem', (address, meta) => ({
  request: {
    promise: (async function () {})(),
  },
  meta: {
    asMutation: true,
    ...meta,
    getData: data => data,
    onRequest: (
      request: { promise: Promise<any> },
      action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async () => {
          const { data: brandList } = await store.dispatchRequest(
            getAccountBrand(address),
          );
          if (brandList) {
            const result = await Promise.all(
              brandList.map(async (item: IBrandInfo) => {
                const { data: num } = await store.dispatchRequest(
                  queryBrandItems({
                    user_address: address,
                    contract_address: item.contractaddress,
                  }),
                );
                return {
                  id: item.id,
                  title: item.brandname,
                  imgSrc: item.imgurl,
                  itemsCount: num,
                } as IMyBrand;
              }),
            );
            return result;
          } else {
            return [];
          }
        })(),
      };
    },
  },
}));
