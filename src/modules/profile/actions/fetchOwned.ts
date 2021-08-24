import { RequestAction } from '@redux-requests/core';
import { mapNftItemData } from 'modules/api/common/itemMap';
import { INftItem, IOriginNftItem } from 'modules/api/common/itemType';
import { IResponse } from 'modules/common/types/ResponseData';
import { createAction as createSmartAction } from 'redux-smart-actions';

interface IArgs {
  address: string;
}

export const fetchOwned = createSmartAction<
  RequestAction<IResponse<IOriginNftItem[]>, INftItem[]>,
  [IArgs]
>('getmyowneditems', ({ address }) => ({
  request: {
    url: '/getmyowneditems',
    method: 'post',
    data: {
      accountaddress: address,
    },
  },
  meta: {
    asMutation: false,
    auth: true,
    driver: 'axios',
    getData: data => {
      if (data.code !== 200) {
        console.error('getmyowneditems:', data?.msg ?? 'Unexpected error');
        return [];
      }
      return mapNftItemData(data?.data ?? []);
    },
  },
}));
