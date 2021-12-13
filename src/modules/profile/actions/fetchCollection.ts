import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { mapNftItemData } from 'modules/api/common/itemMap';
import { INftItem, IOriginNftItem } from 'modules/api/common/itemType';
import { isOtherPlatformCode } from 'modules/common/conts';
import { ISelectOption } from 'modules/uiKit/Select';
import { createAction as createSmartAction } from 'redux-smart-actions';

interface IResponse<T> {
  code: number;
  msg?: string;
  data: T;
}

interface ICollectionClassItem {
  brandsymbol: string;
}
type ICollectionClassData = ICollectionClassItem[];
interface IFetchCollectionArgs {
  address: string;
  isPlatform: number;
  className?: string;
  offset?: number;
  limit?: number;
}
export const fetchCollection = createSmartAction<
  RequestAction<
    IResponse<IOriginNftItem[]>,
    { total: number; list: INftItem[] }
  >,
  [
    IFetchCollectionArgs,
    RequestActionMeta<IOriginNftItem[], { total: number; list: INftItem[] }>?,
  ]
>(
  'fetchCollection',
  (
    {
      address,
      className = '',
      isPlatform,
      offset,
      limit,
    }: IFetchCollectionArgs,
    meta?: any,
  ) => ({
    request: {
      url:
        isPlatform !== isOtherPlatformCode
          ? 'getmycollectionbyfilter'
          : '/get_collection_allitems',
      method: 'post',
      data: {
        accountaddress: address,
        contractaddress: className,
        offset,
        limit,
      },
    },
    meta: {
      asMutation: false,
      auth: true,
      driver: 'axios',
      ...meta,
      getData: data => {
        if (data.code !== 200) {
          console.error('fetchCollection:', data?.msg ?? 'Unexpected error');
          return [];
        }
        return {
          list: mapNftItemData(data?.data ?? []),
          total: (data as any).total,
        };
      },
    },
  }),
);

export const fetchCollectionClass = createSmartAction<
  RequestAction<IResponse<ICollectionClassData>, ISelectOption[]>,
  [IFetchCollectionArgs]
>('fetchCollectionClass', params => ({
  request: {
    url: '/getbrandssymbol',
    method: 'post',
    data: {
      accountaddress: params.address,
    },
  },
  meta: {
    asMutation: false,
    auth: true,
    driver: 'axios',
    getData: data => {
      if (data.code !== 1) {
        console.error('fetchCollectionClass:', data?.msg ?? 'Unexpected error');
        return [];
      }
      return (
        data?.data?.map(item => {
          return {
            value: item.brandsymbol,
            label: item.brandsymbol || 'All',
          };
        }) ?? []
      );
    },
  },
}));
