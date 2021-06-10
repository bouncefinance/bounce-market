import { createAction as createSmartAction } from 'redux-smart-actions';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { IApiNFTDetails, INFTDetails, mapNFTDetails } from '../api/NFTDetails';
import { Store } from 'redux';
import { RootState } from 'store';
import { setAccount } from '../../account/store/actions/setAccount';

export const fetchItem = createSmartAction<
  RequestAction<IApiNFTDetails, INFTDetails>
>('fetchItem', (params: { contract: string; id: number }, meta) => ({
  request: {
    url: '/api/v2/main/auth/getoneitembyid',
    method: 'post',
    data: { ct: params.contract, id: params.id },
  },
  meta: {
    getData: data => mapNFTDetails(data),
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
    auth: true,
    driver: 'axiosSmartchain',
    asMutation: false, 
    ...meta,
  },
}));
