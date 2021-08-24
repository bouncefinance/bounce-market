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
import { ProductCardCategoryType } from 'modules/common/components/ProductCard';
import { IResponse } from 'modules/common/types/ResponseData';
import { addTokenSymbolByDriver } from 'modules/common/utils/addTokenSymbolByDriver';
import { setLikesMapDataAsync } from 'modules/common/store/like';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState, store } from 'store';
import { INftItem, IOriginNftItem } from 'modules/api/common/itemType';
import { mapNftItemData } from 'modules/api/common/itemMap';
import { IPoolAvatars } from 'modules/api/common/NftType';

interface ILikePool extends IPoolAvatars {
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

export interface ILikedItem extends Omit<ILikePool | IOriginNftItem, 'price'> {
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

export const queryLikedItems = createSmartAction<
  RequestAction<IResponse<IOriginNftItem[]>, INftItem[]>,
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
      if (data.code !== 200) {
        console.error(
          'get liked items error:',
          data?.msg ?? 'Unexpected error',
        );
        return [];
      }

      const likes = mapNftItemData(data.data);

      setLikesMapDataAsync(likes)(store.dispatch);
      return likes;
    },
    onSuccess: addTokenSymbolByDriver,
  },
}));
