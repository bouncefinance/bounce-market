import { RequestAction } from '@redux-requests/core';
import { NftType } from 'modules/api/common/NftType';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IApiUpdateBrandInfo } from '../api/updateBrandInfo';
import { UpdateBrandInfoAction } from './const';

export interface IUpdateBrandInfoPayload {
  brandname: string;
  contractaddress: string;
  standard: NftType;
  description: string;
  imgurl: string;
  owneraddress: string;
  ownername: string;
  txid: string;
}

export const updateBrandInfo = createSmartAction<
  RequestAction<IApiUpdateBrandInfo, any>,
  [IUpdateBrandInfoPayload]
>(UpdateBrandInfoAction, data => {
  return {
    request: {
      url: '/auth/addbrand',
      method: 'post',
      data,
    },
    meta: {
      auth: true,
      driver: 'axios',
      asMutation: true,
      getData: (data: IApiUpdateBrandInfo) => {
        if (data.code !== 1) {
          throw new Error(data.msg);
        }
      },
    },
  };
});
