import { RootState } from '@react-three/fiber';
import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from '@reduxjs/toolkit';
import { createAction as createSmartAction } from 'redux-smart-actions';

interface ITokenFrozenRes {
  code: number;
  msg?: string;
  data: {};
}
export const tokenFrozen = createSmartAction<
  any,
  [
    {
      address: string;
      token_type?: string;
      token_id?: string;
      ft?: number;
    },
  ]
>('tokenFrozen', ({ address, token_id, ft = 0 }) => {
  return {
    request: {
      url: '/proxy/assets/frozen',
      method: 'post',
      data: {
        address,
        token_id,
      },
    },
    meta: {
      asMutation: true,
      driver: 'axios',
      getData: (data: ITokenFrozenRes) => {
        if (data.code !== 200) {
          throw new Error(data.msg);
        }
        return data;
      },
      onSuccess: (
        response: any,
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return response;
      },
    },
  };
});

export const tokenUnfrozen = createSmartAction<
  any,
  [
    {
      address: string;
      token_id?: string;
      ft?: number;
    },
  ]
>('tokenFrozen', ({ address, token_id, ft = 0 }) => {
  return {
    request: {
      url: '/proxy/assets/unfreeze',
      method: 'post',
      data: {
        address,
        token_id,
      },
    },
    meta: {
      asMutation: true,
      driver: 'axios',
      getData: (data: ITokenFrozenRes) => {
        if (data.code !== 200) {
          throw new Error(data.msg);
        }
        return data;
      },
      onSuccess: (
        response: any,
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return response;
      },
    },
  };
});
