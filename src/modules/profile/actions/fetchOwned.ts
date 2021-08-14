import { RequestAction } from '@redux-requests/core';
import { IResponse } from 'modules/common/types/ResponseData';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { INftItem } from './fetchCollection';

export type IMyOwnedData = INftItem[];
interface IArgs {
  address: string;
}

export const fetchOwned = createSmartAction<
  RequestAction<IResponse<IMyOwnedData>, IMyOwnedData>,
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
      if (data.code !== 1) {
        console.error('getmyowneditems:', data?.msg ?? 'Unexpected error');
        return [];
      }
      return (
        data.data?.map(item => {
          return {
            ...item,
            isLike: Boolean(item.mylikecount),
          };
        }) ?? []
      );
    },
  },
}));
