import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { FetchPopularBrandsAction } from './const';

interface IApiFetchPopularBrandsData {
  code: 1,
  data: {
    auditor: string;
    bandimgurl: string;
    brandname: string;
    brandsymbol: string;
    contractaddress: string;
    created_at: string;
    description: string;
    faildesc: string;
    id: number;
    imgurl: string;
    owneraddress: string;
    ownername: string;
    popularweight: string;
    standard: 1 | 2;
    status: number;
    updated_at: number;
  }[]
}

export interface IBrandItem {
  imgUrl: string;
  id: number;
}

export const fetchPopularBrands = createSmartAction<
  RequestAction<IApiFetchPopularBrandsData, IBrandItem[]>
>(FetchPopularBrandsAction, () => ({
  request: {
    url: '/api/v2/main/getpopularbrands',
    method: 'post',
    data: {
      accountaddress: ''
    }
  },
  meta: {
    auth: true,
    driver: 'axios',
    asMutation: false,
    getData: data => {
      return data.data.map(item => ({
        imgUrl: item.imgurl,
        id: item.id
      }))
    }
  }
}))