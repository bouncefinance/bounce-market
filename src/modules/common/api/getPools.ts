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
