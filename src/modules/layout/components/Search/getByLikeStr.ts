import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { featuresConfig } from '../../../common/conts';

interface IApiSearchResult {
  code: 1;
  data: {
    account: {
      accountaddress: string;
      bandimgurl: string;
      bio: string;
      bounceid: number;
      created_at: string;
      email: string;
      fullnam: string;
      id: number;
      imgurl: string;
      updated_at: string;
      username: string;
    }[];
    brands: {
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
      popularweight: number;
      standard: number;
      status: number;
      updated_at: string;
    }[];
    items: {
      brandid: number;
      category: 'image' | 'video';
      channel: string;
      contractaddress: string;
      created_at: string;
      description: string;
      externallink: string;
      fileurl: string;
      id: number;
      itemname: string;
      itemsymbol: string;
      levels: string;
      litimgurl: string;
      metadata: string;
      owneraddress: string;
      ownername: string;
      popularweight: number;
      price: string;
      properties: string;
      standard: number;
      stats: string;
      status: number;
      supply: number;
      unlockablecontent: number;
      updated_at: string;
    }[];
  };
}

export interface ISearchItem {
  id: number;
  name: string;
  previewUrl: string;
  category: 'image' | 'video';
  price: string;
  priceType: string;
}

export interface ISearchBrand {
  id: number;
  name: string;
  previewUrl: string;
}

export interface ISearchAccount {
  id: number;
  name: string;
  previewUrl: string;
}

export interface ISearchResult {
  items: ISearchItem[];
  brands: ISearchBrand[];
  accounts: ISearchAccount[];
}

const mapSearchResult = (result: IApiSearchResult): ISearchResult => {
  const items = result.data.items;
  const brands = result.data.brands;
  const accounts = result.data.account;
  return {
    items: items
      .sort((a, b) => b.popularweight - a.popularweight)
      .map(item => ({
        id: item.id,
        name: item.itemname,
        category: item.category,
        previewUrl: item.fileurl,
        price: item.price,
        priceType: 'BNB',
      }))
      .slice(0, 3),
    brands: brands
      .sort((a, b) => b.popularweight - a.popularweight)
      .map(item => ({
        id: item.id,
        name: item.brandname,
        previewUrl: item.imgurl,
      }))
      .slice(0, 3),
    accounts: featuresConfig.usersInSearch
      ? accounts
          .map(item => ({
            id: item.id,
            name: item.fullnam,
            previewUrl: item.imgurl,
          }))
          .slice(0, 3)
      : [],
  };
};

export const getByLikeStr = createSmartAction<
  RequestAction<IApiSearchResult, ISearchResult>
>('getByLikeStr', (likestr: string) => ({
  request: {
    url: '/api/v2/main/getbylikestr',
    method: 'post',
    data: {
      accountaddresss: '',
      likestr: likestr,
    },
  },
  meta: {
    auth: true,
    driver: 'axios',
    asMutation: false,
    getData: data => {
      return mapSearchResult(data);
    },
  },
}));
