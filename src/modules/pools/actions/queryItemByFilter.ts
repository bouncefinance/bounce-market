import { RequestAction } from '@redux-requests/core';
import { NFTCategoryType } from 'modules/overview/actions/fetchItemsByFilter';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { addTokenSymbolToArrayByDriver } from '../../common/utils/addTokenSymbolToArrayByDriver';

// TODO: Merge with src/modules/createNFT/actions/fetchItemsByFilter.ts

export interface IItem {
  category: NFTCategoryType;
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
>('queryItemByFilterAction', data => ({
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
    },
    onSuccess: addTokenSymbolToArrayByDriver,
  },
}));
