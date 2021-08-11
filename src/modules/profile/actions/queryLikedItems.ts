import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { Store } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
import { AuctionState } from 'modules/api/common/AuctionState';
import { AuctionType } from 'modules/api/common/auctionType';
import { FixedSwapState } from 'modules/api/common/FixedSwapState';
import { auctionTypeMap, PoolType } from 'modules/api/common/poolType';
import { ProductCardCategoryType } from 'modules/common/components/ProductCard';
import { IResponse } from 'modules/common/types/ResponseData';
import { addTokenSymbolByDriver } from 'modules/common/utils/addTokenSymbolByDriver';
import { setLikesMapDataAsync } from 'modules/common/store/like';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState, store } from 'store';
import Web3 from 'web3';

interface ILikePoolItem {
  category: ProductCardCategoryType;
  contractaddress: string;
  fileurl: string;
  identity: number;
  likecount: number;
  mylikecount: number;
  name: string;
  username: string;
  open_at: number;
  poolid: number;
  pooltype: number;
  price: number;
  state: FixedSwapState | AuctionState;
  swapped_amount0: number;
  token_amount0: number;
  tokenid: number;
  minteraddress: string;
  avatar: string;
  balance: string;
  supply: number;
}
interface ILikePool {
  category: ProductCardCategoryType;
  contractaddress: string;
  fileurl: string;
  identity: number;
  likecount: number;
  mylikecount: number;
  name: string;
  username: string;
  open_at: number;
  poolid: number;
  pooltype: number;
  price: number;
  state: FixedSwapState | AuctionState;
  swapped_amount0: number;
  token_amount0: number;
  tokenid: number;
  minteraddress: string;
  avatar: string;
}

export interface IPoolNftItem {
  price: BigNumber;
  openAt: Date;
  poolType: AuctionType;
  isLike: boolean;
}

export type IMySaleData = {
  likeitems: ILikePool[];
  likepools: ILikePoolItem[];
};

export interface ILikedItem extends Omit<ILikePool | ILikePoolItem, 'price'> {
  poolType: AuctionType;
  price: BigNumber;
  itemId: number;
  poolId: number;
  isLike: boolean;
  openAt: Date;
  isItemType: boolean;
  supply?: number;
  balance?: number;
}

const getIsEnglishAuction = (type: number) =>
  type === PoolType.EnglishAuction || type === PoolType.EnglishAuctionTiming;

export const queryLikedItems = createSmartAction<
  RequestAction<IResponse<IMySaleData>, ILikedItem[]>,
  []
>('queryLikedItems', () => ({
  request: {
    url: '/auth/getaccountlike',
    method: 'post',
  },
  meta: {
    asMutation: false,
    auth: true,
    driver: 'axios',
    onRequest: (
      request,
      _action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      const { data } = getQuery<ISetAccountData>(store.getState(), {
        type: setAccount.toString(),
      });

      request.data = { accountaddress: data?.address };

      return request;
    },
    getData: data => {
      if (data.code !== 1) {
        console.error('getmybiditems:', data?.msg ?? 'Unexpected error');
        return [];
      }

      const likes = [
        ...data.data.likeitems.map(e => ({ ...e, isItemType: true })),
        ...data.data.likepools.map(e => ({ ...e, isItemType: false })),
      ].map(item => {
        const pooltype = item.pooltype;
        const isEnglishAuction = getIsEnglishAuction(pooltype);
        const getLiveSate = () =>
          isEnglishAuction ? AuctionState.Live : FixedSwapState.Live;
        const getCloseSate = () =>
          isEnglishAuction ? AuctionState.Claimed : FixedSwapState.Completed;

        return {
          ...item,
          price: new BigNumber(Web3.utils.fromWei(item.price.toString())),
          openAt: new Date(item.open_at * 1e3),
          poolType: auctionTypeMap[pooltype],
          state: item.state === 0 ? getLiveSate() : getCloseSate(),
          isLike: Boolean(item.mylikecount),
          itemId: item.tokenid,
          poolId: item.poolid,
        };
      });

      setLikesMapDataAsync(likes)(store.dispatch);
      return likes;
    },
    onSuccess: addTokenSymbolByDriver,
  },
}));
