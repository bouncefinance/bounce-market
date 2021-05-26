import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IApiBrandInfoItem, IBrandInfo } from '../api/queryBrand';
import { QueryBrandByIdAction } from './const';
import { NftType } from '../../createNFT/actions/createNft';

export const queryBrandById = createSmartAction<
  RequestAction<IApiBrandInfoItem, IBrandInfo>,
  [
    { id: number; accountaddress?: string }?,
    RequestActionMeta<IApiBrandInfoItem, IBrandInfo>?,
  ]
>(QueryBrandByIdAction, (params, meta) => {
  return {
    request: {
      url: `/api/v2/main/getbrandbyid`,
      method: 'post',
      data: params,
    },
    meta: {
      ...meta,
      driver: 'axios',
      getData: data => {
        if (data.code !== 1) {
          throw new Error('Unexpected response');
        }

        return {
          ...data.data,
          standard: data.data.standard === 1 ? NftType.ERC721 : NftType.ERC1155,
        };
      },
    },
  };
});
