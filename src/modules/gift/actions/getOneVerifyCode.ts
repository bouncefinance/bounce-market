import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IApiGetOneVerifyCode } from '../api/getOneVerifyCode';

interface IGetOneVerifyCodeArgs {
  contractaddress: string;
}

export interface IGetOneVerifyCodePayload {
  verifycode: string;
}

export const getOneVerifyCode = createSmartAction<
  RequestAction<IApiGetOneVerifyCode, IGetOneVerifyCodePayload | null>,
  [IGetOneVerifyCodeArgs]
>('getOneVerifyCode', params => ({
  request: {
    url: `/getone_verifycode`,
    method: 'post',
    data: params,
  },
  meta: {
    driver: 'axios',
    getData: data => {
      if (data.code !== 200) {
        console.error('getone_verifycode:', 'Unexpected response');
        return null;
      }

      return {
        ...data.data,
      };
    },
  },
}));
