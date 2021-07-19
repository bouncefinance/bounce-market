import { Timestamp } from '../../common/types/unit';
import BigNumber from 'bignumber.js';
import { AuctionTypeKeys } from 'modules/api/common/auctionType';

export interface IActivityItemApi {
  id: number;
  auction_event: string;
  contract: string;
  from: string;
  to: string;
  quantity: number;
  price: string;
  auction_type: AuctionTypeKeys;
  created_at: Timestamp;
  ctime: number;
  height: number;
  pool_id: number;
  token_id: number;
  txid: string;
  user_address: string;
}

export interface IActivityData {
  code: 1 | number;
  data: IActivityItemApi[];
  msg: string;
}

export interface IActivityItem {
  id: number;
  event: string;
  contract: string;
  from: string;
  to: string;
  tokenId: number;
  quantity: number;
  price: BigNumber;
  timestamp: Timestamp;
}

export interface IActivityTableItem extends IActivityItem {
  fileUrl: string;
  itemName: string;
  category: string;
}
