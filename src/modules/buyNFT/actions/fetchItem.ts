import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import {
  getOneItemByIdUrl,
  IApiGetOneItemById,
  IApiGetOneItemByIdData,
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

export const fetchItem = createSmartAction<
  RequestAction<IApiGetOneItemById, IFetchItem>
>('fetchItem', (params: { contract: string; id: number }, meta) => ({
  request: {
    url: getOneItemByIdUrl,
    method: 'post',
    data: { ct: params.contract, id: params.id },
  },
  meta: {
    getData({ data }) {
      return mapGetOneItemById(data as IApiGetOneItemByIdData);
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
