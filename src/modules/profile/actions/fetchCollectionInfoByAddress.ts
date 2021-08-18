import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

interface IResponse {
  code: number;
  msg?: string;
  data: ICollectionItem[];
}
export interface ICollectionItem {
  bandimgurl: string;
  brandname: string;
  brandsymbol: string;
  contractaddress: string;
  description: string;
  id: number;
  imgurl: string;
  owneraddress: string;
  ownerimg: string;
  ownername: string;
  popularweight: number;
  standard: number;
  status: number;
}

export type INftItem = ICollectionItem;

export type ICollectionData = ICollectionItem[];
interface IFetchCollectionArgs {
  collectionAddress: string;
}
export const fetchCollectionInfoByAddress = createSmartAction<
  RequestAction<IResponse, ICollectionItem | null>,
  [IFetchCollectionArgs]
>(
  'fetchCollectionInfoByAddress',
  ({ collectionAddress }: IFetchCollectionArgs) => ({
    request: {
      url: '/getbrandsbyfilter',
      method: 'post',
      data: {
        brandcontractaddressess: [collectionAddress],
      },
    },
    meta: {
      asMutation: false,
      auth: true,
      driver: 'axios',
      getData: data => {
        if (data.code !== 1) {
          console.error(
            'fetchCollectionInfoByAddress:',
            data?.msg ?? 'Unexpected error',
          );
          return null;
        }
        return data?.data[0] ?? null;
      },
    },
  }),
);
