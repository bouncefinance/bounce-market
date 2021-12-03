import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import {
  getOneDropsDetailUrl,
  IApiOneDropsDetail,
  IGetOneDropsDetailParams,
} from 'modules/api/getOneDropsDetail';
import { createAction as createSmartAction } from 'redux-smart-actions';

interface IFetchDropSubCardArgs {
  id: number;
  poolsState?: number;
}

export interface IFetchDropSubCard {
  fileurl: string;
  name: string;
  poolId: number;
  poolType: string;
  price: BigNumber;
  state: number;
  swappedAmount0: number;
  tokenAmount0: number;
}

export const fetchDropSubCard = createSmartAction<
  RequestAction<IApiOneDropsDetail, IFetchDropSubCard[] | null>,
  [
    IFetchDropSubCardArgs,
    RequestActionMeta<IApiOneDropsDetail, IFetchDropSubCard[]>?,
  ]
>('getDropDetails', (params, meta) => ({
  request: {
    url: getOneDropsDetailUrl + `?${params.id}`,
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
    ...meta,
    driver: 'axios',
    getData: data => {
      // if (data.code !== 200) {
      //   console.error(`
      //   getDropDetails: Unexpected response.
      //   To avoid this type of error notification you might need
      //   to look at the https://github.com/klis87/redux-requests/discussions/470
      //   `);
      // }

      if (!data.data) {
        return null;
      }

      const cardList = data?.data.poolsinfo;
      return (cardList as unknown) as IFetchDropSubCard[];
    },
  },
}));
