import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { NotificationActions } from 'modules/notification/store/NotificationActions';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { IProfileInfo } from '../api/profileInfo';
import { fetchProfileInfo } from './fetchProfileInfo';
import { showSuccesNotify } from './showSuccesNotify';

interface IApiResponse {
  data?: any;
  code: number;
  msg: string;
}

interface IEditProfileArgs {
  fullName?: string;
  username?: string;
  bio?: string;
  email?: string;
  imgUrl?: string;
  website?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  accountAddress: string;
}

export const editProfile: (
  payload: IEditProfileArgs,
) => RequestAction<any, any> = createSmartAction<RequestAction>(
  'editProfile',
  ({
    fullName = '',
    username = '',
    bio = '',
    email = '',
    imgUrl = '',
    website = '',
    instagram = '',
    twitter = '',
    facebook = '',
    accountAddress,
  }: IEditProfileArgs) => ({
    request: {
      url: '/auth/updateaccount',
      method: 'post',
      data: {
        accountaddress: accountAddress,
        bio,
        email,
        username: username ? username : undefined,
        fullname: fullName,
        imgurl: imgUrl,
        website: website,
        instagram: instagram,
        twitter: twitter,
        facebook: facebook,
      },
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
        const { data: profileInfo } = getQuery<IProfileInfo | null>(
          store.getState(),
          {
            type: fetchProfileInfo.toString(),
          },
        );

        const isUserNotExisted =
          !profileInfo?.accountAddress && !profileInfo?.username;

        if (isUserNotExisted) {
          request.url = '/auth/addaccount';
        }

        return request;
      },
      mutations: {
        [fetchProfileInfo.toString()]: (
          data: IProfileInfo | undefined,
          { code }: IApiResponse,
        ): IProfileInfo | undefined => {
          if (code === 1) {
            const updatedData = {
              ...(imgUrl ? { imgUrl } : {}),
              accountAddress,
              bio,
              email,
              fullName,
              username,
              website: website,
              instagram: instagram,
              twitter: twitter,
              facebook: facebook,
            };

            if (data) {
              return {
                ...data,
                ...updatedData,
              };
            }

            return {
              imgUrl,
              bgImgUrl: '',
              followCount: 0,
              ...updatedData,
            };
          }

          return data;
        },
      },
      onSuccess: (
        response: { data: IApiResponse },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        if (response.data.code === 1) {
          store.dispatch(showSuccesNotify());
        } else {
          console.error(response.data.msg);
          store.dispatch(
            NotificationActions.showNotification({
              message: response.data.msg,
              severity: 'error',
            }),
          );
        }

        return response;
      },
    },
  }),
);
