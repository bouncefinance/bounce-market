import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IApiBrandInfoItem, IBrandInfo } from '../api/queryBrand';
import { QueryBrandByIdAction } from './const';

export const queryBrandById = createSmartAction<
  RequestAction<IApiBrandInfoItem, IBrandInfo | null>,
  [
    { id: number; accountaddress?: string }?,
    RequestActionMeta<IApiBrandInfoItem, IBrandInfo>?,
  ]
>(QueryBrandByIdAction, (params, meta) => {
  return {
    request: {
      url: `/api/v2/main/getbrandbyid`,
      method: 'post',
      data: params,
    },
    meta: {
      ...meta,
      driver: 'axios',
      getData: data => {
        // todo: need to rework error handling
        if (data.code !== 1) {
          console.error('queryBrandById:', 'Unexpected response');
          return null;
        }

        return {
          ...data.data,
        };
      },
    },
  };
});
