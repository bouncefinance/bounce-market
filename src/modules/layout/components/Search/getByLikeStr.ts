import { RequestAction } from '@redux-requests/core';
import { AuctionTypeKeys } from 'modules/api/common/auctionType';
import { fromWei } from 'modules/common/utils/fromWei';
import { NFTCategoryType } from 'modules/overview/actions/fetchItemsByFilter';
import { createAction as createSmartAction } from 'redux-smart-actions';

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
      poolid: number;
      pooltype: AuctionTypeKeys;
      brandid: number;
      category: NFTCategoryType;
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
  poolid: number;
  pooltype: AuctionTypeKeys;
  id: number;
  name: string;
  previewUrl: string;
  category: NFTCategoryType;
  price: string;
  priceType: string;
}

export interface ISearchBrand {
  name: string;
  contractAddress: string;
  previewUrl: string;
}

export interface ISearchAccount {
  id: number;
  name: string;
  previewUrl: string;
  accountAddress: string;
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
        poolid: item.poolid,
        pooltype: item.pooltype,
        id: item.id,
        name: item.itemname,
        category: item.category,
        previewUrl: item.fileurl,
        // TODO chainId to wei number
        price: fromWei(item.price, 18),
        // abandoned
        priceType: 'BNB',
      })),

    brands: brands
      .sort((a, b) => b.popularweight - a.popularweight)
      .map(item => ({
        contractAddress: item.contractaddress,
        name: item.brandname,
        previewUrl: item.imgurl,
      })),

    accounts: accounts.map(item => ({
      id: item.id,
      name: item.username,
      previewUrl: item.imgurl,
      accountAddress: item.accountaddress,
    })),
  };
};

export const getByLikeStr = createSmartAction<
  RequestAction<IApiSearchResult, ISearchResult>
>('getByLikeStr', (likestr: string) => ({
  request: {
    url: '/datafilter',
    method: 'post',
    data: {
      likestr,
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
