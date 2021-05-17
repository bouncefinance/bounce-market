import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

export interface IItem {
  category: string;
  channel: string;
  contractaddress: string;
  created_at: string;
  description: string;
  externallink: string;
  fileurl: string;
  id: number;
  itemname: string;
  itemsymbol: string;
  likecount: number;
  litimgurl: string;
  metadata: string;
  owneraddress: string;
  standard: number;
  supply: number;
}

interface IApiItem {
  code: 1 | number;
  data: IItem[];
}

export const queryItemByFilter = createSmartAction<
  RequestAction<IApiItem, IItem[]>
>(
  'queryItemByFilterAction',
  data => ({
    request: {
      url: `/api/v2/main/getitemsbyfilter`,
      method: 'post',
      data: data,
    },
    meta: {
      driver: 'axios',
      asMutation: true,
      getData: data => {
        if (data.code !== 1) {
          throw new Error('Unexpected response');
        }
        return data.data;
      }
    }
  })
)