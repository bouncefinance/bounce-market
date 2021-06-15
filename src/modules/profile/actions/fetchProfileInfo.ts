import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { mapProfileInfo } from '../api/profileInfo';

export const fetchProfileInfo = createSmartAction<RequestAction>(
  'fetchProfileInfo',
  () => ({
    request: {
      url: '/api/v2/main/auth/getaccount',
      method: 'post',
    },
    meta: {
      asMutation: false,
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

        request.data = { accountaddress: address };

        return request;
      },
      getData: mapProfileInfo,
    },
  }),
);
