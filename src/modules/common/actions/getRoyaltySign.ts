import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction } from '@redux-requests/core';

export interface IRoyaltyload {
  _royaltyRatio: number;
  _royaltyReceiver: string;
  collection: string;
}

interface IRoyaltyRes {
  code: number;
  msg: string;
  data: any;
}

interface IRoyaltyData {
  expireTime: number;
  sign: string;
}

export const getRoyaltySign = createSmartAction<
  RequestAction<IRoyaltyRes, IRoyaltyData>,
  [IRoyaltyload]
>('getRoyaltySign', data => {
  return {
    request: {
      url: '/auth/generate_royalty_sign',
      method: 'post',
      data,
    },
    meta: {
      auth: true,
      driver: 'axios',
      asMutation: true,
      getData: data => {
        if (data.code !== 200) {
          throw new Error('Unexpected response');
        }
        return data.data;
      },
    },
  };
});
