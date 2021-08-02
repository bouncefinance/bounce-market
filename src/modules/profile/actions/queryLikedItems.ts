// import { DispatchRequest, RequestAction } from '@redux-requests/core';
// import BigNumber from 'bignumber.js';
// import { PoolType } from 'modules/api/common/poolType';
// import { throwIfDataIsEmptyOrError } from 'modules/common/utils/throwIfDataIsEmptyOrError';
// import { fetchPools } from 'modules/overview/actions/fetchPools';
// import { Store } from 'redux';
// import { createAction } from 'redux-smart-actions';
// import { RootState } from 'store';
// import Web3 from 'web3';
// import { getAccountLikes, IAccountLike } from './getAccountLikes';

// export interface ILikedItem extends IAccountLike {
//   poolType: PoolType;
//   price: BigNumber;
//   createTime: string;
//   token1: string;
//   likes: number;
// }

// export const queryLikedItems = createAction<RequestAction<any, ILikedItem[]>>(
//   'queryLikedItems',
//   () => ({
//     request: {
//       promise: (async function () {})(),
//     },
//     meta: {
//       onRequest: (
//         _request: { promise: Promise<any> },
//         _action: RequestAction,
//         store: Store<RootState> & { dispatchRequest: DispatchRequest },
//       ) => {
//         return {
//           promise: (async () => {
//             const { data: pools } = throwIfDataIsEmptyOrError(
//               await store.dispatchRequest(
//                 fetchPools(
//                   {
//                     limit: 1000,
//                   },
//                   {
//                     asMutation: true,
//                   },
//                 ),
//               ),
//             );

//             const { data: accountLikes } = throwIfDataIsEmptyOrError(
//               await store.dispatchRequest(getAccountLikes()),
//             );

//             const likedItems = accountLikes
//               .map(accountLike => {
//                 const poolInfo = pools.data.find(
//                   pool =>
//                     pool.tokenid === accountLike.itemId &&
//                     pool.poolid === accountLike.poolId,
//                 );
//                 if (!poolInfo) {
//                   return null;
//                 } else {
//                   return {
//                     ...accountLike,
//                     accountAddress: poolInfo.creator,
//                     poolType: accountLike.auctionType,
//                     price: new BigNumber(Web3.utils.fromWei(poolInfo.price)),
//                     createTime: poolInfo.created_at,
//                     token1: poolInfo.token1,
//                     likes: poolInfo.likecount,
//                   } as ILikedItem;
//                 }
//               })
//               // filter out the null elements
//               .filter(e => e) as ILikedItem[];

//             return likedItems;
//           })(),
//         };
//       },
//     },
//   }),
// );

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
import { UserRoleType } from 'modules/common/actions/queryAccountInfo';
import { ProductCardCategoryType } from 'modules/common/components/ProductCard';
import { IResponse } from 'modules/common/types/ResponseData';
import { addTokenSymbolByDriver } from 'modules/common/utils/addTokenSymbolByDriver';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import Web3 from 'web3';

interface ILikePoolItem {
  category: ProductCardCategoryType;
  contractaddress: string;
  fileurl: string;
  identity: number;
  likecount: number;
  mylikecount: number;
  name: string;
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
  // createTime: string;
  // token1: string;
  // likes: number;
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
>('getmybiditems', () => ({
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
        console.error('getmybiditems:', data?.msg ?? 'Unexpected error');
        return [];
      }

      return [
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
    },
    onSuccess: addTokenSymbolByDriver,
  },
}));
