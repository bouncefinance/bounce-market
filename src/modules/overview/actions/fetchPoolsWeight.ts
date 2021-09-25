import { RequestAction } from '@redux-requests/core';
import { IPoolNftItem, OriginIPoolNftItem } from 'modules/api/common/poolType';
import { IResponse } from 'modules/common/types/ResponseData';
import { addTokenSymbolByDriver } from 'modules/common/utils/addTokenSymbolByDriver';
import { mapPoolData } from 'modules/pools/actions/map';
import { createAction as createSmartAction } from 'redux-smart-actions';

interface IFetchPoolsWeightParams {
  limit: number;
  offset: number;
  orderweight: number;
}

export interface IOverviewItem extends IPoolNftItem {
  description: string;
}

export const fetchPoolsWeight = createSmartAction<
  RequestAction<IResponse<OriginIPoolNftItem[]>, IOverviewItem>
>('fetchPoolsWeight', (params: IFetchPoolsWeightParams, meta?: any) => ({
  request: {
    url: '/get_recomend_pools',
    method: 'get',
    params,
  },
  meta: {
    auth: true,
    driver: 'axios',
    asMutation: false,
    getData: data => {
      return mapPoolData(data?.data ?? []);
    },
    ...meta,
    onSuccess: addTokenSymbolByDriver,
  },
}));
