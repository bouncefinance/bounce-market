import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction } from '@redux-requests/core';

export interface IParams {
  accountaddress: string;
  message: string;
  signature: string;
}

export const getAuthToken = createSmartAction<RequestAction>(
  'getAuthToken',
  (params: IParams) => ({
    request: {
      url: '/jwtauth',
      method: 'post',
      data: params,
    },
    meta: {
      driver: 'axios',
    },
  }),
);
