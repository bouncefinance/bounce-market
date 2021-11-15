import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IApiMint } from '../api/mint';

interface IMintArgs {
  accountaddress: string;
  contractaddress: string;
  tokenid: number;
  verifycode: string;
}

export interface IMintPayload {
  txid: string;
}

export const mint = createSmartAction<
  RequestAction<IApiMint, IMintPayload | null>,
  [IMintArgs]
>('mint', params => ({
  request: {
    url: `/mint_oneitem`,
    method: 'post',
    data: params,
  },
  meta: {
    driver: 'axios',
    getData: data => {
      if (data.code !== 200) {
        console.error('mint_oneitem:', 'Unexpected response');
        return null;
      }

      return {
        ...data.data,
      };
    },
  },
}));
