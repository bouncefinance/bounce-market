import {
  DispatchRequest,
  getQuery,
  RequestAction,
  RequestActionMeta,
} from '@redux-requests/core';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
import { FANGIBLE_URL } from 'modules/common/conts';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { IApiRecords, IRecords } from '../api/records';

interface IGetRecordsArgs {
  offset?: number;
  count?: number;
}

export const getRecords = createAction<
  RequestAction<IApiRecords, IRecords>,
  [IGetRecordsArgs?, RequestActionMeta<IApiRecords, IRecords>?]
>('getRecords', (params, meta) => ({
  request: {
    url: '/records',
    method: 'get',
    baseURL: FANGIBLE_URL,
    params: {
      offset: params?.offset || 0,
      count: params?.count || 100,
      user_address: '',
    },
  },
  meta: {
    ...meta,
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

      request.params.user_address = address;

      return request;
    },
    getData: ({ code, msg, data }) => {
      if (code !== 200) {
        throw new Error(msg);
      }
      return data;
    },
  },
}));
