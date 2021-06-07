import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { IProfileInfo } from '../api/profileInfo';
import { fetchProfileInfo } from './fetchProfileInfo';
import { showSuccesNotify } from './showSuccesNotify';
import { NotificationActions } from 'modules/notification/store/NotificationActions';

function isAccountNotExist(data: any) {
  return (
    data.code === 0 &&
    data.msg === 'bandimg update:accountaddress is not existed.'
  );
}

interface IEditProfileBgImgArgs {
  imgUrl: string;
}

export const editProfileBgImg = createSmartAction<RequestAction>(
  'editProfileBgImg',
  ({ imgUrl }: IEditProfileBgImgArgs) => ({
    request: {
      url: '/api/v2/main/auth/updateaccountbandimg',
      method: 'post',
      data: {
        bandimgurl: imgUrl,
      },
    },
    meta: {
      asMutation: true,
      auth: true,
      driver: 'axiosSmartchain',
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

        request.data.accountaddress = address;

        return request;
      },
      mutations: {
        [fetchProfileInfo.toString()]: (
          data: IProfileInfo | undefined,
          { code }: { code: number; msg: any },
        ): IProfileInfo | undefined => {
          if (code === 1) {
            const updatedData = {
              bgImgUrl: imgUrl,
            };

            if (data) {
              return {
                ...data,
                ...updatedData,
              };
            }

            return {
              imgUrl: '',
              accountAddress: '',
              followCount: 0,
              bio: '',
              email: '',
              fullName: '',
              username: '',
              ...updatedData,
            };
          }

          return data;
        },
      },
      onSuccess: async (
        response,
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        if (isAccountNotExist(response.data)) {
          if (response.data.code === 1) {
            await store.dispatchRequest(action);
          } else {
            store.dispatch(
              NotificationActions.showNotification({
                message: `${response.data.msg} you should setup your profile first.`,
                severity: 'error',
              }),
            );
          }
        } else {
          store.dispatch(showSuccesNotify());
        }

        return response;
      },
    },
  }),
);
