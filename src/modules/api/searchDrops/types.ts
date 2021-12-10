import { Address, Timestamp } from 'modules/common/types/unit';

export enum SearchDropsParamState {
  Coming = 1,
  Live = 2,
  Previous = 3,
}

export enum SearchDropsParamOrderType {
  Positive = 1,
  Inverted = 2,
}

export interface ISearchDropsParams {
  /**
   * Means the address of creator of the drops. You can set an empty string.
   */
  accountaddress: string;
  limit: number;
  offset: number;
  ordertype: SearchDropsParamOrderType;
  state: SearchDropsParamState;
}

export interface IApiSearchDropsItem {
  accountaddress: Address;
  bgcolor: string;
  coverimgurl: string;
  created_at: string;
  description: string;
  display: number;
  dropdate: Timestamp;
  id: number;
  instagram: string;
  nfts: number;
  state: SearchDropsParamState;
  title: string;
  twitter: string;
  updated_at: string;
  username: string;
  website: string;
  avatar: string;
  droptype: number;
  blindcoverimgurl: string;
  directLink?: string;
}

export interface IApiSearchDrops {
  code: number;
  data?: IApiSearchDropsItem[];
  msg?: string;
  total?: number;
}
