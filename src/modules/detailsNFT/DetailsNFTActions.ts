import { createAction as createSmartAction } from 'redux-smart-actions';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from '../../store/store';
import { AccountActions } from '../account/store/accountActions';
import { IApiNFTDetails, INFTDetails, mapNFTDetails } from './api/NFTDetails';

export const DetailsNFTActions = {
  fethItem: createSmartAction<RequestAction<IApiNFTDetails, INFTDetails>>(
    'DetailsNFTActions/fethItem',
    (params: { id: number }) => ({
      request: {
        url: '/api/v2/main/auth/getoneitembyid',
        method: 'post',
        data: params,
      },
      meta: {
        getData: data => mapNFTDetails(data),
        onRequest: (
          request: any,
          action: RequestAction,
          store: Store<RootState> & { dispatchRequest: DispatchRequest },
        ) => {
          const { data } = getQuery(store.getState(), {
            type: AccountActions.setAccount.toString(),
            action: AccountActions.setAccount,
          });
          request.data.accountaddress = data?.address;
          return request;
        },
        auth: true,
        driver: 'axios',
        asMutation: false,
      },
    }),
  ),
};
