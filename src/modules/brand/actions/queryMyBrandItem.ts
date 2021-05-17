import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { Store } from 'redux';
import { QueryMyBrandItemAction } from './const';
import { getAccountBrand } from './getAccountBrand';
import { RootState } from 'store';
import { queryBrandItems } from './queryBrandItems';
import { IBrandInfo } from '../api/queryBrand';

export const queryMyBrandItem = createSmartAction(
  QueryMyBrandItemAction,
  (address: string) => ({
    request: {
      promise: (async function () { })(),
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
            const { data: brandList } = await store.dispatchRequest(
              getAccountBrand(address)
            )
            if (brandList) {
              const result = await Promise.all(brandList.map(async (item: IBrandInfo) => {
                const { data: num } = await store.dispatchRequest(
                  queryBrandItems({
                    user_address: address,
                    contract_address: item.contractaddress
                  })
                )
                return {
                  id: item.id,
                  title: item.brandname,
                  imgSrc: item.imgurl,
                  itemsCount: num,
                }
              }))
              return new Promise((resolve, reject) => resolve(result));
            } else {
              return new Promise((resolve, reject) => resolve([]));
            }
          })()
        }
      }
    }
  })
)