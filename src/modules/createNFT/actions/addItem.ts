import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction } from '@redux-requests/core';
import { IAddItem, IApiAddItem, mapAddItem } from '../api/addItem';
import { Channel } from './createNft';

export interface IAddItemPayload {
  brandid: number;
  category: 'image' | 'video';
  channel: Channel;
  contractaddress: string;
  description: string;
  fileurl: string;
  itemname: string;
  itemsymbol: 'BOUNCE' | string;
  owneraddress: string;
  ownername: string;
  standard: 1 | 2 | number;
  supply: number; // is supply an integer?
}

export const addItem = createSmartAction<
  RequestAction<IApiAddItem, IAddItem>,
  [IAddItemPayload]
>('CreateNftActions/addItem', data => {
  return {
    request: {
      url: '/api/v2/main/auth/additem',
      method: 'post',
      data,
    },
    meta: {
      auth: true,
      driver: 'axios',
      asMutation: true,
      getData: data => {
        if (data.code !== 1) {
          throw new Error('Unexpected response');
        }
        return mapAddItem(data);
      },
    },
  };
});
