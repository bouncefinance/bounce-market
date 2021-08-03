import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { AuctionType, AuctionTypeKeys } from 'modules/api/common/auctionType';
import { auctionTypeMap } from 'modules/api/common/poolType';
import { createAction as createSmartAction } from 'redux-smart-actions';

interface IApiFetchPoolsWeightData {
  code: 1;
  data: {
    pool_id: number;
    pool_weight: number;
    auctiontype: AuctionTypeKeys;
  }[];
  total: number;
}

interface IFetchPoolsWeightData {
  list: {
    poolId: number;
    poolWeight: number;
    auctionType: AuctionType;
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
      url: '/get_recomend_pools',
      method: 'get',
    },
    meta: {
      auth: true,
      driver: 'axios',
      asMutation: false,
      getData: data => {
        return {
          list: data.data?.map(item => {
            return {
              poolId: item.pool_id,
              poolWeight: item.pool_weight,
              auctionType: auctionTypeMap[item.auctiontype],
            };
          }),
        };
      },
      ...meta,
    },
  }),
);
