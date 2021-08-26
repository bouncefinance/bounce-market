import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from '@reduxjs/toolkit';
import { INftItem } from 'modules/api/common/itemType';
import { IResponse } from 'modules/common/types/ResponseData';
import { NotificationActions } from 'modules/notification/store/NotificationActions';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { showSuccesNotify } from './showSuccesNotify';

export type IMyOwnedData = INftItem[];
interface IArgs {
  accountAddress: string;
  contractAddress: string;
  desc: string;
}

export const editDescription = createSmartAction<
  RequestAction<IResponse<IMyOwnedData>, any>,
  [IArgs]
>('editDescription', ({ accountAddress, contractAddress, desc }) => ({
  request: {
    url: '/auth/update_brand_description',
    method: 'post',
    data: {
      accountaddress: accountAddress,
      contractaddress: contractAddress,
      description: desc,
    },
  },
  meta: {
    asMutation: false,
    auth: true,
    driver: 'axios',
    onSuccess: (
      response: { data: any },
      action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      if (response.data.code === 200) {
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
}));
