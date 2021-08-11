import { Timestamp } from '../../common/types/unit';
import BigNumber from 'bignumber.js';

export type NFTType = 'image' | 'video';

export enum ActivityKeys {
  Create = 1,
  Listings = 2,
  Bids = 3,
  Purchases = 4,
  Sales = 5,
  Transfers = 6,
}

export interface IActivityItemApi {
  event: string;
  itemname: string;
  quantity: number;
  supply: number;
  amount: string;
  from: string;
  fromname: string;
  fromurl: string;
  to: string;
  toname: string;
  tourl: string;
  fileurl: string;
  ctime: Timestamp;
  category: NFTType;
  tokenid: number;
  contractaddress: string;
}

export interface IActivityData {
  code: 1 | number;
  data: IActivityItemApi[];
  tokenSymbol: string;
  msg: string;
}

export interface IActivityItem {
  event: string;
  itemName: string;
  quantity: number;
  supply: number;
  amount: BigNumber;
  from: string;
  fromName: string;
  fromUrl: string;
  to: string;
  toName: string;
  toUrl: string;
  fileUrl: string;
  ctime: Timestamp;
  category: NFTType;
  tokenid: number;
  contractaddress: string;
}
