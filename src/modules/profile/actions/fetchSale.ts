import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { AuctionState } from 'modules/api/common/AuctionState';
import { AuctionType } from 'modules/api/common/auctionType';
import { FixedSwapState } from 'modules/api/common/FixedSwapState';
import { auctionTypeMap, PoolType } from 'modules/api/common/poolType';
import { UserRoleType } from 'modules/common/actions/queryAccountInfo';
import { ProductCardCategoryType } from 'modules/common/components/ProductCard';
import { IResponse } from 'modules/common/types/ResponseData';
import { addTokenSymbolByDriver } from 'modules/common/utils/addTokenSymbolByDriver';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';

interface _IPoolNftItem {
  open_at: number | 0;
  close_at: number | 0;
  created_at: string;
  pooltype: PoolType;
  auction_type?: PoolType;
  poolweight: string;
  price: string;
  state: FixedSwapState | AuctionState;
  amount_max1: string;
  amount_min1: string;
  amount_min_incr1: string;
  amount_total1: string;
  last_bidder: string;
  // TODO
  Standard: number;
  Supply: number;
  creator_claimed: number;
  bidder_claimed: number;
  duration: number;
  itemname: string;
  // nft main img
  creator: string;
  creatorurl: string;
  // pool creatorname
  username: string;
  fileurl: string;
  identity: UserRoleType;
  poolid: number;
  pool_id?: number;
  likecount: number;
  mylikecount: number;
  // contract
  token0: string;
  tokenid: number;
  swapped_amount0: number;
  token_amount0: number;
  category: ProductCardCategoryType;
}

export interface IPoolNftItem extends Omit<_IPoolNftItem, 'price'> {
  price: BigNumber;
  openAt: Date;
  closeAt: Date;
  poolType: AuctionType;
  isLike: boolean;
}

export type IMySaleData = _IPoolNftItem[];
interface IArgs {
  address: string;
  limit?: number;
  offset?: number;
}

const getIsEnglishAuction = (type: number) =>
  type === PoolType.EnglishAuction || type === PoolType.EnglishAuctionTiming;

export const fetchMySale = createSmartAction<
  RequestAction<IResponse<IMySaleData>, IPoolNftItem[]>,
  [IArgs]
>('getuseronsellpools', ({ address, limit, offset }) => ({
  request: {
    url: '/getuseronsellpools',
    method: 'post',
    data: {
      useraddress: address,
      offset: offset || 0,
      limit: limit || 1000,
    },
  },
  meta: {
    asMutation: false,
    auth: true,
    driver: 'axios',
    getData: data => {
      if (data.code !== 1) {
        console.error('getuseronsellpools:', data?.msg ?? 'Unexpected error');
        return [];
      }

      return data.data.map(item => {
        const isEnglishAuction = getIsEnglishAuction(item.pooltype);
        const getLiveSate = () =>
          isEnglishAuction ? AuctionState.Live : FixedSwapState.Live;
        const getCloseSate = () =>
          isEnglishAuction ? AuctionState.Claimed : FixedSwapState.Completed;
        return {
          ...item,
          price: new BigNumber(Web3.utils.fromWei(item.price)),
          openAt: new Date(item.open_at * 1e3),
          closeAt: new Date(item.close_at * 1e3),
          poolType: auctionTypeMap[item.pooltype],
          state: item.state === 0 ? getLiveSate() : getCloseSate(),
          isLike: Boolean(item.mylikecount),
        };
      });
    },
    onSuccess: addTokenSymbolByDriver,
  },
}));

export const fetchMyBids = createSmartAction<
  RequestAction<IResponse<IMySaleData>, IPoolNftItem[]>,
  [IArgs]
>('getmybiditems', ({ address, limit, offset }) => ({
  request: {
    url: '/getmybiditems',
    method: 'post',
    data: {
      accountaddress: address,
    },
  },
  meta: {
    asMutation: false,
    auth: true,
    driver: 'axios',
    getData: data => {
      if (data.code !== 1) {
        console.error('getmybiditems:', data?.msg ?? 'Unexpected error');
        return [];
      }

      return data.data.map(item => {
        const pooltype = item.pooltype ?? item.auction_type;
        const isEnglishAuction = getIsEnglishAuction(pooltype);
        const getLiveSate = () =>
          isEnglishAuction ? AuctionState.Live : FixedSwapState.Live;
        const getCloseSate = () =>
          isEnglishAuction ? AuctionState.Claimed : FixedSwapState.Completed;
        return {
          ...item,
          price: new BigNumber(Web3.utils.fromWei(item.price)),
          openAt: new Date(item.open_at * 1e3),
          closeAt: new Date(item.close_at * 1e3),
          poolType: auctionTypeMap[pooltype],
          state: item.state === 0 ? getLiveSate() : getCloseSate(),
          isLike: Boolean(item.mylikecount),
        };
      });
    },
    onSuccess: addTokenSymbolByDriver,
  },
}));
