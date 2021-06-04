import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
import { showSuccesNotify } from 'modules/profile/actions/showSuccesNotify';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { IBrandInfo } from '../api/queryBrand';
import { EditBrandImgAction } from './const';
import { getAccountBrand } from './getAccountBrand';

function isError(data: any) {
  return data.code === 0;
}

interface IEditBrandImgArgs {
  imgUrl: string;
  accountaddress: string;
  contractaddress: string;
}

export const editBrandImg = createSmartAction<RequestAction>(
  EditBrandImgAction,
  ({ imgUrl, accountaddress, contractaddress }: IEditBrandImgArgs) => ({
    request: {
      url: '/api/v2/main/auth/updatebandimgbycontract',
      method: 'post',
      data: {
        accountaddress: accountaddress,
        bandimgurl: imgUrl,
        contractaddress: contractaddress,
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
        [getAccountBrand.toString()]: (
          data: IBrandInfo | undefined,
          { code, msg }: { code: number; msg: any },
        ): IBrandInfo | undefined => {
          if (code === 1) {
            const updatedData = {
              bandimgurl: imgUrl,
            };

            if (data) {
              return {
                ...data,
                ...updatedData,
              };
            }
            return data;
          }
        },
      },
      onSuccess: async (
        response,
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        if (isError(response.data)) {
          await store.dispatchRequest(action);
        } else {
          store.dispatch(showSuccesNotify());
        }

        return response;
      },
    },
  }),
);
