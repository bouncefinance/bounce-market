
import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IApiBrandInfoItem, IBrandInfo } from '../api/queryBrand';
import { QueryBrandByIdAction } from './const';

export const queryBrandById = createSmartAction<
  RequestAction<IApiBrandInfoItem, IBrandInfo>
>(QueryBrandByIdAction, data => {
  return {
    request: {
      url: `/api/v2/main/getbrandbyid`,
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