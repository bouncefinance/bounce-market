import { Timestamp } from '../../common/types/unit';
import BigNumber from 'bignumber.js';

export interface IActivityItemApi {
  id: number;
  event: string;
  contract: string;
  from: string;
  to: string;
  tokenId: number;
  quantity: number;
  price: string;
  timestamp: Timestamp;
  Timestamp: Timestamp;
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
