import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IApiGetAirdropByCode } from '../api/getAirdropByCode';

interface IGetAirdropByCodeArgs {
  verifycode: string;
}

export interface IGetAirdropByCodePayload {
  tokenid: number;
  itemname: string;
  itemsymbol: string;
  fileurl: string;
  contractaddress: string;
  description: string;
  username: string;
  avatar: string;
  state: 1 | 2 | 3;
}

export const getAirdropByCode = createSmartAction<
  RequestAction<IApiGetAirdropByCode, IGetAirdropByCodePayload | null>,
  [IGetAirdropByCodeArgs]
>('getAirdropByCode', params => ({
  request: {
    url: `/getone_by_verifycode`,
    method: 'post',
    data: params,
  },
  meta: {
    driver: 'axios',
    getData: data => {
      if (data.code !== 200) {
        console.error('getone_by_verifycode:', 'Unexpected response');
        return null;
      }

      return {
        ...data.data,
      };
    },
  },
}));
