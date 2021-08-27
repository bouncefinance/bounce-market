import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

interface IResponse {
  code: number;
  msg?: string;
  data: ICollectionItem;
}
export interface ICollectionItem {
  bandimgurl: string;
  brandname: string;
  brandsymbol: string;
  contractaddress: string;
  description: string;
  id: number;
  identity: number;
  imgurl: string;
  owneraddress: string;
  isplatform: 0 | 1;
  ownerimg: string;
  ownername: string;
  popularweight: number;
  standard: number;
  status: number;
  followerscount: number;
  followingcount: number;
}

export type INftItem = ICollectionItem;

export type ICollectionData = ICollectionItem;
interface IFetchCollectionArgs {
  collectionAddress: string;
}
export const fetchCollectionInfoByAddress = createSmartAction<
  RequestAction<IResponse, ICollectionItem | null>,
  [IFetchCollectionArgs]
>('getbrandsbyfilter', ({ collectionAddress }: IFetchCollectionArgs) => ({
  request: {
    url: '/get_brand_by_contract',
    method: 'post',
    data: {
      contractaddress: collectionAddress,
    },
  },
  meta: {
    asMutation: false,
    auth: false,
    driver: 'axios',
    getData: data => {
      if (data.code !== 200) {
        console.error(
          'fetchCollectionInfoByAddress:',
          data?.msg ?? 'Unexpected error',
        );
        return null;
      }
      return data?.data ?? null;
    },
  },
}));
