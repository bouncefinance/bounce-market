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
import { showSuccesNotify } from './showSuccesNotify';

interface IEditProfileBandImgArgs {
  imgUrl: string;
  id?: string;
}

export const editProfileBandImg = createSmartAction<RequestAction>(
  'editProfileBandImg',
  ({ imgUrl, id = '0' }: IEditProfileBandImgArgs) => ({
    request: {
      url: '/api/v2/main/auth/updateaccountbandimg',
      method: 'post',
      data: {
        id,
        bandimgurl: imgUrl,
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
              bandImgUrl: imgUrl,
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
      onSuccess: (
        request,
        _action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        store.dispatch(showSuccesNotify());

        return request;
      },
    },
  }),
);