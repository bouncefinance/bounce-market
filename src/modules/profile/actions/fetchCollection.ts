import { RequestAction } from '@redux-requests/core';
import { ProductCardCategoryType } from 'modules/common/components/ProductCard';
import { ISelectOption } from 'modules/uiKit/Select';
import { createAction as createSmartAction } from 'redux-smart-actions';

interface IResponse<T> {
  code: number;
  msg?: string;
  data: T;
}
interface ICollectionItem {
  contractaddress: string;
  creatoraddress: string;
  creatorimage: string;
  creatorname: string;
  fileurl: string;
  itemname: string;
  itemsymbol: string;
  likecount: number;
  standard: 1 | 0;
  balance: number;
  supply: number;
  tokenid: number;
  mylikecount: number;
  isLike: boolean;
  category: ProductCardCategoryType;
}

export type INftItem = ICollectionItem;

interface ICollectionClassItem {
  brandsymbol: string;
}
export type ICollectionData = ICollectionItem[];
type ICollectionClassData = ICollectionClassItem[];
interface IFetchCollectionArgs {
  address: string;
  className?: string;
}
export const fetchCollection = createSmartAction<
  RequestAction<IResponse<ICollectionData>, ICollectionData>,
  [IFetchCollectionArgs]
>('fetchCollection', ({ address, className = '' }: IFetchCollectionArgs) => ({
  request: {
    url: '/getmycollectionbyfilter',
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
    getData: data => {
      if (data.code !== 1) {
        console.error('fetchCollection:', data?.msg ?? 'Unexpected error');
        return [];
      }
      return data.data;
    },
  },
}));

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
