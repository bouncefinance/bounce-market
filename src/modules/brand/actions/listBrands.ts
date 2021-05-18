import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { IApiBrand } from '../api/queryBrand';
import { ListBrandsAction } from './const';
import { queryBrandByFilter } from './queryBrandByFilter';
import { queryBrandList } from './queryBrandList';
import { IBrandItem } from './fetchPopularBrands';

export const listBrands = createSmartAction<
  RequestAction<IBrandItem[], IBrandItem[]>
>(ListBrandsAction, () => ({
  request: {
    promise: (async function () {})(),
  },
  meta: {
    getData: data => data,
    asMutation: true,
    onRequest: (
      request: { promise: Promise<any> },
      action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async () => {
          const { data: brandList } = await store.dispatchRequest(
            queryBrandList(),
          );
          return await new Promise(async (resolve, reject) => {
            if (brandList) {
              const addressList = brandList.map(
                (item: IApiBrand) => item.contract_address,
              );
              const { data: brandInfo } = await store.dispatchRequest(
                queryBrandByFilter({
                  Brandcontractaddressess: addressList,
                  accountaddress: '',
                }),
              );
              resolve(brandInfo);
            } else {
              resolve([]);
            }
          });
        })(),
      };
    },
  },
}));
