import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IApiBrandInfo, IBrandInfo } from '../api/queryBrand';
import { GetAccountBrandAction } from './const';

export const getAccountBrand = createSmartAction<
  RequestAction<IApiBrandInfo, IBrandInfo[]>
>(GetAccountBrandAction, (address: string) => ({
  request: {
    url: `/getbrandsbypage`,
    method: 'post',
    data: {
      accountaddress: address,
      limit: 1000,
      offset: 0,
      orderfiled: 1,
    },
  },
  meta: {
    auth: true,
    driver: 'axios',
    asMutation: false,
    getData: data => {
      if (data.code !== 1) {
        throw new Error('Unexpected response');
      }
      return data.data;
    },
  },
}));
