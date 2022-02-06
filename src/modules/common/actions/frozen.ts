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
      token_type: string;
      token_id: string;
      ft?: number;
    },
  ]
>('tokenFrozen', ({ address, token_type, token_id, ft = 0 }) => {
  return {
    request: {
      url: '/assets/frozen',
      method: 'post',
      data: {
        address,
        asset_list: {
          nft: [
            {
              token_type,
              token_id,
            },
          ],
          // 精度
          // ft,
        },
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
      token_type: string;
      token_id: string;
      ft?: number;
    },
  ]
>('tokenFrozen', ({ address, token_type, token_id, ft = 0 }) => {
  return {
    request: {
      url: '/assets/unFrozen',
      method: 'post',
      data: {
        address,
        asset_list: {
          nft: [
            {
              token_type,
              token_id,
            },
          ],
          // 精度
          // ft,
        },
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
