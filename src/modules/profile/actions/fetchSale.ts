import { RequestAction } from '@redux-requests/core';
import { IPoolNftItem, OriginIPoolNftItem } from 'modules/api/common/poolType';
import { IResponse } from 'modules/common/types/ResponseData';
import { addTokenSymbolByDriver } from 'modules/common/utils/addTokenSymbolByDriver';
import { mapPoolData } from 'modules/pools/actions/map';
import { createAction as createSmartAction } from 'redux-smart-actions';

export type IMySaleData = OriginIPoolNftItem[];
interface IArgs {
  address: string;
  limit?: number;
  offset?: number;
}

export const fetchMySale = createSmartAction<
  RequestAction<IResponse<IMySaleData>, IPoolNftItem[]>,
  [IArgs]
>('getuseronsellpools', ({ address, limit, offset }) => ({
  request: {
    url: '/getuseronsellpools',
    method: 'post',
    data: {
      useraddress: address,
      offset: offset || 0,
      limit: limit || 1000,
    },
  },
  meta: {
    asMutation: false,
    auth: true,
    driver: 'axios',
    getData: data => {
      if (data.code !== 200) {
        console.error('getuseronsellpools:', data?.msg ?? 'Unexpected error');
        return [];
      }

      return mapPoolData(data?.data ?? []);
    },
    onSuccess: addTokenSymbolByDriver,
  },
}));

interface ICollectionArgs extends IArgs {
  collectionAddress: string;
}

export const fetchCollectionSale = createSmartAction<
  RequestAction<IResponse<IMySaleData>, IPoolNftItem[]>,
  [ICollectionArgs]
>('getuseronsellpools', ({ address, collectionAddress, limit, offset }) => ({
  request: {
    url: '/get_collection_onsellpools',
    method: 'post',
    data: {
      // accountaddress: address,
      artistaddress: address,
      contractaddress: collectionAddress,
      offset: offset || 0,
      limit: limit || 1000,
    },
  },
  meta: {
    asMutation: false,
    auth: true,
    driver: 'axios',
    getData: data => {
      if (data.code !== 200) {
        console.error(
          'get_collection_onsellpools:',
          data?.msg ?? 'Unexpected error',
        );
        return [];
      }

      return mapPoolData(data?.data ?? []);
    },
    onSuccess: addTokenSymbolByDriver,
  },
}));

export const fetchMyBids = createSmartAction<
  RequestAction<IResponse<IMySaleData>, IPoolNftItem[]>,
  [IArgs]
>('getmybiditems', ({ address, limit, offset }) => ({
  request: {
    url: '/getmybiditems',
    method: 'post',
    data: {
      accountaddress: address,
    },
  },
  meta: {
    asMutation: false,
    auth: true,
    driver: 'axios',
    getData: data => {
      if (data.code !== 200) {
        console.error('getmybiditems:', data?.msg ?? 'Unexpected error');
        return [];
      }

      return mapPoolData(data?.data ?? []);
    },
    onSuccess: addTokenSymbolByDriver,
  },
}));
