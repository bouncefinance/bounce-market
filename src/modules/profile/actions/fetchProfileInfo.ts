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
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import {
  IApiProfileInfo,
  IProfileInfo,
  mapProfileInfo,
} from '../api/profileInfo';

interface IFetchProfileInfoArgs {
  address: string;
}

type Test = RequestActionMeta<IApiProfileInfo, IProfileInfo | undefined> & {
  auth?: boolean;
};

export const fetchProfileInfo = createSmartAction<
  RequestAction<IApiProfileInfo, IProfileInfo | undefined>,
  [IFetchProfileInfoArgs?, Test?]
>('fetchProfileInfo', (params, meta) => ({
  request: {
    url: '/getaccount',
    method: 'post',
  },
  meta: {
    asMutation: false,
    ...meta,
    driver: 'axios',
    onRequest: (
      request,
      _action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      const { data: accountData } = getQuery<ISetAccountData | null>(
        store.getState(),
        {
          type: setAccount.toString(),
        },
      );

      request.data = {
        accountaddress: params?.address ?? accountData?.address,
      };

      return request;
    },
    getData: data => {
      if (data.code === 0) {
        // historyInstance.replace(ProfileRoutesConfig.EditProfile.generatePath());
        console.error('fetchProfileInfo:', data?.msg ?? 'Unexpected error');
        return;
      }
      return mapProfileInfo(data);
    },
  },
}));
