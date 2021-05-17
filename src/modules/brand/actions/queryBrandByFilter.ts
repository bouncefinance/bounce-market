
import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IApiQueryBrandInfo, IBrandInfo } from '../api/queryBrand';
import { QueryBrandByFilterAction } from './const';

export const queryBrandByFilter = createSmartAction<
  RequestAction<IApiQueryBrandInfo, IBrandInfo[]>
>(QueryBrandByFilterAction, data => {
  return {
    request: {
      url: `/api/v2/main/getbrandsbyfilter`,
      method: 'post',
      data: data,
    },
    meta: {
      driver: 'axios',
      asMutation: true,
      getData: data => {
        if (data.code !== 1) {
          throw new Error('Unexpected response');
        }
        return data.data;
      }
    }
  }
})