import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store/store';
import { IProfileInfo } from '../api/profileInfo';
import { fetchProfileInfo } from './fetchProfileInfo';

interface IEditProfileArgs {
  fullName: string;
  username: string;
  bio?: string;
  email?: string;
  imgUrl?: string;
}

export const editProfile = createSmartAction<RequestAction>(
  'editProfile',
  ({
    fullName,
    username,
    bio = '',
    email = '',
    imgUrl = '',
  }: IEditProfileArgs) => ({
    request: {
      url: '/api/v2/main/auth/updateaccount',
      method: 'post',
    },
    meta: {
      asMutation: true,
      auth: true,
      driver: 'axios',
      onRequest: (
        request,
        _action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        const {
          data: { address },
        } = getQuery<ISetAccountData>(store.getState(), {
          type: setAccount.toString(),
        });

        const { data: profileInfo } = getQuery<IProfileInfo | null>(
          store.getState(),
          {
            type: fetchProfileInfo.toString(),
          },
        );

        const isUserNotExisted = !profileInfo?.accountAddress;

        if (isUserNotExisted) {
          request.url = '/api/v2/main/auth/addaccount';
        }

        request.data = {
          accountaddress: address,
          bio,
          email,
          username,
          fullname: fullName,
          imgurl: imgUrl,
        };

        return request;
      },
      mutations: {
        [fetchProfileInfo.toString()]: (
          data: IProfileInfo | undefined,
          { code }: { code: number; msg: any },
        ): IProfileInfo | undefined => {
          if (code === 1) {
            const updatedData = {
              ...(imgUrl ? { imgUrl } : {}),
              bio,
              email,
              fullName,
              username,
            };

            if (data) {
              return {
                ...data,
                ...updatedData,
              };
            }

            return {
              imgUrl,
              accountAddress: '',
              bandImgUrl: '',
              followCount: 0,
              ...updatedData,
            };
          }

          return data;
        },
      },
    },
  }),
);
