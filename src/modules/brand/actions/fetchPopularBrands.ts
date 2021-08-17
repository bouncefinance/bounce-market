import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { FetchPopularBrandsAction } from './const';

export interface IItemsInfo {
  contractaddress: string;
  fileurl: string;
  itemname: string;
  itemsymbol: string;
  standard: number;
  supply: number;
  tokenid: number;
}
interface IApiFetchPopularBrandsData {
  code: 1;
  data: {
    brandname: string;
    contractaddress: string;
    creatoraddress: string;
    creatorimgurl: string;
    imgurl: string;
    itemsinfo: IItemsInfo[];
    username: string;
  }[];
}

export interface IBrandItem {
  brandName: string;
  imgUrl: string;
  id: number;
  creatorAddress: string;
  contractAddress: string;
  itemsInfo: IItemsInfo[];
}

export const fetchPopularBrands = createSmartAction<
  RequestAction<IApiFetchPopularBrandsData, IBrandItem[]>
>(FetchPopularBrandsAction, () => ({
  request: {
    url: '/getpopularinfo',
    method: 'get',
    data: {},
  },
  meta: {
    auth: true,
    driver: 'axios',
    asMutation: false,
    getData: data => {
      return (
        data?.data?.map((item, index) => ({
          brandName: item.brandname,
          imgUrl: item.imgurl,
          id: index,
          creatorAddress: item.creatoraddress,
          contractAddress: item.contractaddress,
          itemsInfo: item.itemsinfo,
        })) ?? []
      );
    },
  },
}));
