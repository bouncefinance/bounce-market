import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { AuctionState } from 'modules/api/common/AuctionState';
import { FixedSwapState } from 'modules/api/common/FixedSwapState';
import { NftType } from 'modules/api/common/NftType';
import { auctionTypeMap, PoolType } from 'modules/api/common/poolType';
import { IApiQueryPool, IQueryPool } from 'modules/pools/actions/queryPools';
import { createAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { IFetchPoolDetailsData } from '../../overview/actions/fetchPoolDetails';

function mapPool(data: IQueryPool): IFetchPoolDetailsData {
  if (
    data.auctiontype === PoolType.EnglishAuction ||
    data.auctiontype === PoolType.EnglishAuctionTiming
  ) {
    return {
      amountMax1: new BigNumber(Web3.utils.fromWei(data.amount_max1)),
      amountMin1: new BigNumber(Web3.utils.fromWei(data.amount_min1)),
      amountMinIncr1: new BigNumber(Web3.utils.fromWei(data.amount_min_incr1)),
      bidderClaimed: data.bidder_claimed,
      openAt: new Date(data.open_at * 1000),
      closeAt: new Date(data.close_at * 1000),
      createTime: new Date(data.created_at),
      creator: data.creator,
      creatorClaimed: data.creator_claimed,
      duration: data.duration,
      lastestBidAmount: new BigNumber(Web3.utils.fromWei(data.price)),
      name: data.name,
      /**
       * For fields returned by the https://api1-bsc.fangible.com interface and data read directly from the contract, nftType=0 represents ERC721 and 1 represents ERC1155.
       * If the interface from https://bounce-market.bounce.finance/api/ requested data standard = 1 represents ERC721, 2 representative ERC1155
       */
      nftType: NftType.ERC1155,
      poolId: data.pool_id,
      auctionType: auctionTypeMap[data.auctiontype],
      state: data.state === 0 ? AuctionState.Live : AuctionState.Claimed,
      tokenContract: data.token0,
      unitContract: data.token0,
      tokenAmount0: data.token_amount0,
      tokenId: data.token_id,
      swappedAmount0: data.swapped_amount0,
      identity: data.identity,
      last_bidder: data.last_bidder,
    };
  } else {
    return {
      quantity: data.token_amount0,
      totalPrice: new BigNumber(Web3.utils.fromWei(data.amount_total1)),
      createTime: new Date(data.close_at * 1000),
      openAt: new Date(data.open_at * 1000),
      creator: data.creator,
      name: data.name,
      nftType: NftType.ERC721,
      poolId: data.pool_id,
      price: new BigNumber(Web3.utils.fromWei(data.price)),
      state: data.state === 0 ? FixedSwapState.Live : FixedSwapState.Completed,
      tokenContract: data.token0,
      unitContract: data.token1,
      tokenId: data.token_id,
      auctionType: auctionTypeMap[data.auctiontype],
      swappedAmount0: data.swapped_amount0,
      identity: data.identity,
      last_bidder: data.last_bidder,
    };
  }
}

interface IPoolsData {
  list: IFetchPoolDetailsData[];
}

export const getPoolsByFilter = createAction<
  RequestAction<IApiQueryPool, IPoolsData>,
  [
    {
      user?: string;
      contract_address?: string;
    }?,
    RequestActionMeta<IApiQueryPool, IPoolsData>?,
  ]
>('getPoolsByFilter', (params, meta) => ({
  request: {
    url: '/pools',
    method: 'get',
    params: {
      user_address: params?.user,
      contract_address: params?.contract_address,
      offset: 0,
      count: 1000,
    },
  },
  meta: {
    driver: 'axios',
    getData: data => {
      // TODO parse the response
      if (data.code !== 1) {
        // throw new Error('Unexpected response');
        return { list: [] };
      }

      return {
        list: data.data?.pools.map(mapPool),
      };
    },
    ...meta,
  },
}));
