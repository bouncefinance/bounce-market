import {
  DispatchRequest,
  getQuery,
  RequestAction,
  RequestActionMeta,
} from '@redux-requests/core';
import { Store } from '@reduxjs/toolkit';
import { setAccount } from 'modules/account/store/actions/setAccount';
import { RootState } from 'store';
import BigNumber from 'bignumber.js';
import { NftType } from 'modules/api/common/NftType';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { AuctionState } from '../../api/common/AuctionState';
import { AuctionType, AuctionTypeState } from '../../api/common/auctionType';
import { FixedSwapState } from '../../api/common/FixedSwapState';
import { Address } from '../../common/types/unit';

export interface IApiPoolDetails {
  Standard: number;
  Supply: number;
  amount_max1: string;
  amount_min1: string;
  amount_min_incr1: string;
  amount_total1: string;
  bidder_claimed: number;
  category: string;
  channel: string;
  close_at: number;
  created_at: string;
  creator: Address;
  creator_claimed: number;
  creatorurl: string;
  duration: number;
  fileurl: string;
  itemname: string;
  last_bidder: string;
  likecount: number;
  owner: string;
  poolid: number;
  pooltype: number;
  poolweight: number;
  price: string;
  state: 0 | 1;
  swapped_amount0: number;
  token0: string;
  token1: string;
  token_amount0: number;
  tokenid: number;
  username: string;
  open_at: number;
  mylikecount: number;
  identity: number;
}
export interface IApiFixedAuctionDetails {
  amount_total0: number;
  amount_total1: string;
  createTime: number;
  creator: Address;
  name: string;
  nftType: 0;
  poolId: number;
  price: string;
  state: 0 | 1;
  token0: string;
  token1: string;
  tokenId: number;
}
export interface IApiEnglishAuctionDetails {
  amountMax1: string;
  amountMin1: string;
  amountMinIncr1: string;
  bidderClaimed: boolean;
  closeAt: number;
  createTime: number;
  creator: Address;
  creatorClaimed: boolean;
  duration: number;
  lastestBidAmount: string;
  name: string;
  nftType: 1;
  poolId: number;
  state: 0 | 1;
  token0: string;
  token1: string;
  tokenAmount0: number;
  tokenId: number;
}

export interface IApiFetchPoolDetails {
  code: 1;
  data: {
    poolinfo: IApiPoolDetails;
  };
  msg: 'ok';
}

export interface IFixedAuctionDetails {
  totalQuantity?: number;
  quantity: number;
  totalPrice: BigNumber;
  createTime: Date;
  creator: Address;
  name: string;
  nftType: NftType;
  poolId: number;
  price: BigNumber;
  state: FixedSwapState;
  tokenContract: Address;
  unitContract: Address;
  tokenId: number;
  openAt: Date;
  avatar?: string;
  auctionType?: AuctionType;
  createName?: string;
  likeCount?: number;
  isLike?: boolean;
  swappedAmount0: number;
  identity: number;
  last_bidder: string;
}

export interface IEnglishAuctionDetails {
  amountMax1: BigNumber;
  amountMin1: BigNumber;
  amountMinIncr1: BigNumber;
  bidderClaimed: boolean;
  closeAt: Date;
  createTime: Date;
  creator: Address;
  creatorClaimed: boolean;
  duration: number;
  lastestBidAmount: BigNumber;
  name: string;
  nftType: NftType;
  poolId: number;
  state: AuctionState;
  tokenContract: Address;
  unitContract: Address;
  tokenAmount0: number;
  tokenId: number;
  openAt: Date;
  avatar?: string;
  auctionType?: AuctionType;
  createName?: string;
  likeCount?: number;
  isLike?: boolean;
  swappedAmount0: number;
  identity: number;
  last_bidder: string;
}

export type IFetchPoolDetailsData =
  | IFixedAuctionDetails
  | IEnglishAuctionDetails;

export function isApiEnglishAuction(
  data: IApiFixedAuctionDetails | IApiEnglishAuctionDetails,
): data is IApiEnglishAuctionDetails {
  return !!(data as IApiEnglishAuctionDetails)?.amountMax1;
}

export function isApiEnglishAuctionPool(
  data: IApiPoolDetails,
): data is IApiPoolDetails {
  return (data as IApiPoolDetails)?.pooltype === 2;
}

export function isEnglishAuction(
  data: IFetchPoolDetailsData,
): data is IEnglishAuctionDetails {
  return (data as IEnglishAuctionDetails)?.amountMax1 instanceof BigNumber;
}

interface IFetchPoolDetailsParams {
  poolId: number;
  poolType: AuctionType;
}

// TODO Replace Web3.utils.fromWei by fromWei

export const fetchPoolDetails = createSmartAction<
  RequestAction<IApiFetchPoolDetails, IFetchPoolDetailsData>
>(
  'fetchPoolDetails',
  (
    params: IFetchPoolDetailsParams,
    meta?: RequestActionMeta<IApiFetchPoolDetails, IFetchPoolDetailsData>,
  ) => ({
    request: {
      url: '/getonepoolinfo',
      method: 'post',
      data: {
        poolId: params.poolId,
        poolType: AuctionTypeState[params.poolType],
      },
    },
    meta: {
      auth: true,
      driver: 'axios',
      asMutation: false,
      getData: ({ data }) => {
        const poolInfo: IApiPoolDetails = data?.poolinfo;
        try {
          if (
            params.poolType === AuctionType.EnglishAuction ||
            params.poolType === AuctionType.EnglishAuction_Timing
          ) {
            return {
              amountMax1: new BigNumber(
                Web3.utils.fromWei(poolInfo.amount_max1),
              ),
              amountMin1: new BigNumber(
                Web3.utils.fromWei(poolInfo.amount_min1),
              ),
              amountMinIncr1: new BigNumber(
                Web3.utils.fromWei(poolInfo.amount_min_incr1),
              ),
              bidderClaimed: !!poolInfo.bidder_claimed,
              openAt: new Date(poolInfo.open_at * 1000),
              closeAt: new Date(poolInfo.close_at * 1000),
              createTime: new Date(poolInfo.created_at),
              creator: poolInfo.creator,
              creatorClaimed: !!poolInfo.creator_claimed,
              duration: poolInfo.duration,
              lastestBidAmount: new BigNumber(
                Web3.utils.fromWei(poolInfo.price),
              ),
              name: poolInfo.itemname,
              nftType: NftType.ERC1155,
              poolId: poolInfo.poolid,
              state: poolInfo.state,
              tokenContract: poolInfo.token0,
              unitContract: poolInfo.token1,
              tokenAmount0: poolInfo.token_amount0,
              tokenId: poolInfo.tokenid,
              avatar: poolInfo.creatorurl,
              auctionType: params.poolType,
              createName: poolInfo.username,
              likeCount: poolInfo?.likecount,
              isLike: Boolean(poolInfo?.mylikecount) ?? 0,
              swappedAmount0: poolInfo.swapped_amount0,
              identity: poolInfo.identity,
              last_bidder: poolInfo.last_bidder,
            };
          } else {
            return {
              quantity: poolInfo.token_amount0,
              totalPrice: new BigNumber(
                Web3.utils.fromWei(poolInfo.amount_total1),
              ),
              createTime: new Date(poolInfo.created_at),
              creator: poolInfo.creator,
              openAt: new Date(poolInfo.open_at * 1000),
              name: poolInfo.itemname,
              nftType: NftType.ERC721,
              poolId: poolInfo.poolid,
              price: new BigNumber(Web3.utils.fromWei(poolInfo.price)),
              state: poolInfo.state,
              tokenContract: poolInfo.token0,
              unitContract: poolInfo.token1,
              tokenId: poolInfo.tokenid,
              avatar: poolInfo.creatorurl,
              auctionType: params.poolType,
              createName: poolInfo.username,
              likeCount: poolInfo?.likecount,
              isLike: Boolean(poolInfo?.mylikecount) ?? 0,
              swappedAmount0: poolInfo.swapped_amount0,
              identity: poolInfo.identity,
              last_bidder: poolInfo.last_bidder,
            };
          }
        } catch (error) {
          return {
            quantity: poolInfo.token_amount0,
            totalPrice: new BigNumber(
              Web3.utils.fromWei(poolInfo.amount_total1),
            ),
            createTime: new Date(poolInfo.created_at),
            creator: poolInfo.creator,
            openAt: new Date(poolInfo.open_at * 1000),
            name: poolInfo.itemname,
            nftType: NftType.ERC721,
            poolId: poolInfo.poolid,
            price: new BigNumber(Web3.utils.fromWei(poolInfo.price)),
            state: poolInfo.state,
            tokenContract: poolInfo.token0,
            unitContract: poolInfo.token1,
            tokenId: poolInfo.tokenid,
            avatar: poolInfo.creatorurl,
            auctionType: params.poolType,
            createName: poolInfo.username,
            likeCount: poolInfo?.likecount,
            isLike: Boolean(poolInfo?.mylikecount) ?? 0,
            swappedAmount0: poolInfo.swapped_amount0,
            identity: poolInfo.identity,
            last_bidder: poolInfo.last_bidder,
          };
        }
      },
      onRequest: (
        request: any,
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        const { data } = getQuery(store.getState(), {
          type: setAccount.toString(),
          action: setAccount,
        });
        request.data.accountaddress = data?.address;
        return request;
      },
      ...meta,
    },
  }),
);
