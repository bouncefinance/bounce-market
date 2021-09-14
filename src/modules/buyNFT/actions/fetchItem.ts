import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import {
  getOneItemByIdUrl,
  IApiGetOneItemById,
  IGetOneItemById,
  mapGetOneItemById,
} from 'modules/api/getOneItemById';
import { TokenSymbol } from 'modules/common/types/TokenSymbol';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { setAccount } from '../../account/store/actions/setAccount';
import { addTokenSymbolByDriver } from '../../common/utils/addTokenSymbolByDriver';

export interface IFetchItem extends IGetOneItemById {
  tokenSymbol: TokenSymbol;
}
export interface IFetchItem2 {
  likecount: number;
  mylike: number;
  tokenSymbol: TokenSymbol;
  collection: {
    address: string;
    avatar: string;
    name: string;
  };
  minter: {
    address: string;
    avatar: string;
    username: string;
  };
  owners: {
    avatar: string;
    balance: number;
    owneraddress: string;
    username: string;
  }[];
  total: number;
}

export const fetchItem = createSmartAction<
  RequestAction<IApiGetOneItemById, IFetchItem>
>('fetchItem', (params: { contract: string; id: number }, meta) => ({
  request: {
    url: getOneItemByIdUrl,
    method: 'post',
    data: { contractaddress: params.contract, tokenid: params.id },
  },
  meta: {
    getData({ data }) {
      return data && mapGetOneItemById(data);
    },
    onRequest: (
      request: any,
      action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      const { data } = getQuery(store.getState(), {
        type: setAccount.toString(),
        action: setAccount,
      });
      request.data.accountaddress = data?.address;
      return request;
    },
    onSuccess: addTokenSymbolByDriver,
    // auth: true,
    driver: 'axios',
    asMutation: false,
    ...meta,
  },
}));

export const fetchItem2 = createSmartAction<
  RequestAction<IApiGetOneItemById, IFetchItem2>
>('fetchItem2', (params: { contract: string; id: number }, meta) => ({
  request: {
    url: '/getitemuserinfo',
    method: 'post',
    data: { contractaddress: params.contract, tokenid: params.id },
  },
  meta: {
    getData({ data }) {
      return data;
    },
    onRequest: (
      request: any,
      action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      const { data } = getQuery(store.getState(), {
        type: setAccount.toString(),
        action: setAccount,
      });
      request.data.accountaddress = data?.address;
      return request;
    },
    onSuccess: addTokenSymbolByDriver,
    auth: true,
    driver: 'axios',
    asMutation: false,
    ...meta,
  },
}));
