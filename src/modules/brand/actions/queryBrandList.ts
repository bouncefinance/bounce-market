import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import {
  IApiBrand,
  IApiListBrand,
  mapListBrands,
} from '../api/queryBrand';
import { FetchBrandListAction } from './const';

export const queryBrandList = createSmartAction<
  RequestAction<IApiListBrand, IApiBrand[]>
>(FetchBrandListAction, () => {
  return {
    request: {
      url: `/api/v2/main/getbrandsbypage`,
      method: 'post',
      data: {
        limit: 10000,
        offset: 0,
        orderfield: 1,
      }
    },
    meta: {
      auth: true,
      driver: 'axios',
      asMutation: true,
      getData: data => {
        if (data.code !== 1) {
          throw new Error('Unexpected response');
        }
        return mapListBrands(data.data);
      },
    },
  };
});
