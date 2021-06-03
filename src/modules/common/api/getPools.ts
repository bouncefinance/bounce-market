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
  tokenId: number;
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
  tokenId: number;
}

export interface ITradePool_V2 {
  balance: string;
  created_at: string;
  creatorurl: string;
  fileurl: string;
  itemname: string;
  likecount: number;
  poolid: number;
  pooltype: number;
  poolweight: number;
  price: string;
  state: number;
  token0: string;
  token1: string;
  tokenid: number;
  username: string;
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
}

export interface IGetPools_V2 {
  englishTotal: number;
  fixedSwapTotal: number;
  tradeAuctions: ITradeAuction[];
  tradePools: ITradePool[];
}
