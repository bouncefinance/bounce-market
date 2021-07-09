import { RequestAction } from '@redux-requests/core';
import {
  getOneDropsDetailUrl,
  IApiOneDropsDetail,
  IDropDetails,
  IGetOneDropsDetailParams,
  mapDropDetails,
} from 'modules/api/getOneDropsDetail';
import { TokenSymbol } from 'modules/common/types/TokenSymbol';
import { addTokenSymbolByDriver } from 'modules/common/utils/addTokenSymbolByDriver';
import { createAction as createSmartAction } from 'redux-smart-actions';

interface IGetDropDetailsArgs {
  id: number;
  poolsState?: number;
}

export interface IGetDropDetails extends IDropDetails {
  tokenSymbol?: TokenSymbol;
}

export const getDropDetails = createSmartAction<
  RequestAction<IApiOneDropsDetail, IGetDropDetails | null>,
  [IGetDropDetailsArgs]
>('getDropDetails', params => ({
  request: {
    url: getOneDropsDetailUrl,
    method: 'post',
    data: {
      dropsid: params.id,
      limit: 1000,
      offset: 0,
      poolstate: params.poolsState,
    } as IGetOneDropsDetailParams,
  },
  meta: {
    asMutation: false,
    auth: false,
    driver: 'axios',
    getData: data => {
      if (data.code !== 1) {
        console.error('getDropDetails: Unexpected response');
      }

      if (!data.data) {
        return null;
      }

      return mapDropDetails(data.data);
    },
    onSuccess: addTokenSymbolByDriver,
  },
}));
