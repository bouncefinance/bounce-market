import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { mapNftItemData } from 'modules/api/common/itemMap';
import { INftItem, IOriginNftItem } from 'modules/api/common/itemType';
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
  className?: string;
}
export const fetchCollection = createSmartAction<
  RequestAction<IResponse<IOriginNftItem[]>, INftItem[]>,
  [IFetchCollectionArgs, RequestActionMeta<IOriginNftItem[], INftItem[]>?]
>(
  'fetchCollection',
  ({ address, className = '' }: IFetchCollectionArgs, meta?: any) => ({
    request: {
      url: '/get_collection_allitems',
      method: 'post',
      data: {
        accountaddress: address,
        contractaddress: className,
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
        return mapNftItemData(data?.data ?? []);
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
