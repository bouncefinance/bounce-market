import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IApiBrandInfo, IBrandInfo } from '../api/queryBrand';
import { QueryBrandByFilterAction } from './const';

export const queryBrandByFilter = createSmartAction<
  RequestAction<IApiBrandInfo, IBrandInfo[]>
>(QueryBrandByFilterAction, data => {
  return {
    request: {
      url: `/api/v2/main/getbrandsbyfilter`,
      method: 'post',
      data: data,
    },
    meta: {
      driver: 'axiosSmartchain',
      asMutation: true,
      getData: data => {
        if (data.code !== 1) {
          throw new Error('Unexpected response');
        }
        return data.data;
      },
    },
  };
});
