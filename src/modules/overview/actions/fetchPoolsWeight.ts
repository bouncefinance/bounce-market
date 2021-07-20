import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { auctionTypeMap } from 'modules/api/common/poolType';
import { createAction as createSmartAction } from 'redux-smart-actions';

interface IApiFetchPoolsWeightData {
  code: 1;
  data: {
    artistpoolweight: number;
    created_at: string;
    id: number;
    poolid: number;
    poolweight: number;
    standard: number;
    updated_at: string;
  }[];
  total: number;
}

interface IFetchPoolsWeightData {
  list: {
    artistPoolWeight: number;
    createdAt: Date;
    id: number;
    poolId: number;
    poolWeight: number;
    auctionType: string;
    updatedAt: Date;
  }[];
}

interface IFetchPoolsWeightParams {
  limit: number;
  offset: number;
  orderweight: number;
}

export const fetchPoolsWeight = createSmartAction<
  RequestAction<IApiFetchPoolsWeightData, IFetchPoolsWeightData>
>(
  'fetchPoolsWeight',
  (
    params: IFetchPoolsWeightParams,
    meta?: RequestActionMeta<IApiFetchPoolsWeightData, IFetchPoolsWeightData>,
  ) => ({
    request: {
      url: '/getpoolsinfobypage',
      method: 'post',
      data: params,
    },
    meta: {
      auth: true,
      driver: 'axios',
      asMutation: false,
      getData: data => {
        return {
          list: data.data.map(item => {
            return {
              artistPoolWeight: item.artistpoolweight,
              createdAt: new Date(item.created_at),
              id: item.id,
              poolId: item.poolid,
              poolWeight: item.poolweight,
              auctionType: auctionTypeMap[item.standard],
              updatedAt: new Date(item.updated_at),
            };
          }),
        };
      },
      ...meta,
    },
  }),
);
