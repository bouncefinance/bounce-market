import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
import { NFTCategoryType } from 'modules/overview/actions/fetchItemsByFilter';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store';

export interface IApiAccountLike {
  accountaddress: string;
  auctiontype: number;
  brandid: number;
  category: NFTCategoryType;
  iflike: number;
  imageurl: string;
  itemid: number;
  itemname: string;
  poolid: number;
}

interface IApiAccountLikes {
  code: number;
  msg?: string;
  data: IApiAccountLike[];
}

export interface IAccountLike {
  accountAddress: string;
  auctionType: number;
  brandId: number;
  category: NFTCategoryType;
  isLiked: number;
  imageUrl: string;
  itemId: number;
  itemName: string;
  poolId: number;
}

const mapAccountLike = (item: IApiAccountLike): IAccountLike => ({
  accountAddress: item.accountaddress,
  auctionType: item.auctiontype,
  brandId: item.brandid,
  category: item.category,
  isLiked: item.iflike,
  imageUrl: item.imageurl,
  itemId: item.itemid,
  itemName: item.itemname,
  poolId: item.poolid,
});

export const getAccountLikes = createAction<
  RequestAction<IApiAccountLikes, IAccountLike[]>
>('getAccountLikes', () => ({
  request: {
    url: '/api/v2/main/auth/getaccountlike',
    method: 'post',
  },
  meta: {
    asMutation: true,
    auth: true,
    driver: 'axiosSmartchain',
    onRequest: (
      request,
      _action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      const {
        data: { address },
      } = getQuery<ISetAccountData>(store.getState(), {
        type: setAccount.toString(),
      });

      request.data = { accountaddress: address };

      return request;
    },
    getData: data => {
      if (data.code !== 1) {
        throw new Error(data.msg);
      }

      return data.data.map(mapAccountLike);
    },
  },
}));
