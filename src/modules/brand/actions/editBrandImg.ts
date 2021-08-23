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
  imgType?: CollectionImgType;
}

export enum CollectionImgType {
  Avatar = 'CollectionAvatar',
  Backgound = 'CollectionBg',
}

const getRequest: (
  args: IEditBrandImgArgs,
) => {
  url: string;
  params: object;
} = args => {
  const { imgType: event } = args;
  if (event === CollectionImgType.Backgound)
    return {
      url: '/auth/updatebandimgbycontract',
      params: {
        accountaddress: args.accountaddress,
        bandimgurl: args.imgUrl,
        contractaddress: args.contractaddress,
      },
    };
  // if (event === CollectionImgType.Avatar)
  return {
    url: '/auth/update_brand_img',
    params: {
      accountaddress: args.accountaddress,
      imgurl: args.imgUrl,
      contractaddress: args.contractaddress,
    },
  };
};

export const editBrandImg = createSmartAction<RequestAction>(
  EditBrandImgAction,
  (payloadArgs: IEditBrandImgArgs) => ({
    request: {
      url: getRequest(payloadArgs).url,
      method: 'post',
      data: getRequest(payloadArgs).params,
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
        [getAccountBrand.toString()]: (
          data: IBrandInfo | undefined,
          { code }: { code: number; msg: any },
        ): IBrandInfo | undefined => {
          if (code === 1) {
            const updatedData = {
              bandimgurl: payloadArgs.imgUrl,
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
          // await store.dispatchRequest(action);
        } else {
          store.dispatch(showSuccesNotify());
        }

        return response;
      },
    },
  }),
);
