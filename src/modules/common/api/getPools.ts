import { PoolState } from 'modules/api/common/AuctionState';
import { AuctionTypeKeys } from 'modules/api/common/auctionType';
import { NFTCategoryType } from 'modules/overview/actions/fetchItemsByFilter';
import { UserRoleType } from '../actions/queryAccountInfo';
import { TokenSymbol } from '../types/TokenSymbol';

export interface ITradeAuction {
  amountMax1: string;
  amountMin1: string;
  amountMinIncr1: string;
  bidderClaimed: boolean;
  closeAt: number;
  createTime: number;
  creator: string;
  creatorClaimed: boolean;
  duration: number;
  lastestBidAmount: string;
  name: string;
  nftType: number;
  poolId: number;
  state: number;
  token0: string;
  token1: string;
  tokenAmount0: number;
  tokenId: string;
  auctiontype: AuctionTypeKeys;
}

export interface ITradePool {
  amount_total0: number;
  amount_total1: string;
  createTime: number;
  creator: string;
  name: string;
  nftType: number;
  poolId: number;
  price: string;
  state: number;
  token0: string;
  token1: string;
  tokenId: string;
}

export type PoolCategoryType = NFTCategoryType;

export interface ITradePool_V2 {
  balance: string;
  created_at: string;
  open_at: number;
  creatorurl: string;
  fileurl: string;
  itemname: string;
  likecount: number;
  mylikecount: number;
  poolid: number;
  pooltype: number;
  poolweight: number;
  price: string;
  state: PoolState;
  token0: string;
  token1: string;
  tokenid: string;
  username: string;
  category: PoolCategoryType;
  channel: string;
  creator: string;
  close_at: number;
  swapped_amount0: number;
  token_amount0: number;
  identity: UserRoleType;
}

export interface IGetPoolsApi {
  code: number;
  msg: any;
  data: {
    englishTotal: number;
    fixedSwapTotal: number;
    tradeAuctions: ITradeAuction[];
    tradePools: ITradePool[];
  };
}

export interface IGetPools {
  englishTotal: number;
  fixedSwapTotal: number;
  tradeAuctions: ITradeAuction[];
  tradePools: ITradePool[];
}

export interface IGetPoolsApi_V2 {
  code: number;
  msg?: any;
  data: ITradePool_V2[];
  total: number;
  tokenSymbol?: TokenSymbol;
}

export interface IGetPools_V2 {
  englishTotal: number;
  fixedSwapTotal: number;
  tradeAuctions: ITradeAuction[];
  tradePools: ITradePool[];
}
