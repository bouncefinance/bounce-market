import { OriginIPoolNftItem } from '../common/poolType';

export interface IGetOneDropsDetailParams {
  dropsid: number;
  limit: number;
  offset: number;
  poolstate: number;
}

export enum DropsDetailPoolState {
  Live,
  Closed,
}

export enum DropType {
  Unknown,
  Comming,
  Live,
  Previous,
}

export interface IApiDropsDetailPoolInfo {
  fileurl: string;
  name: string;
  itemname: string;
  poolid: number;
  pooltype: number;
  price: string;
  state: DropsDetailPoolState;
  swapped_amount0: number;
  token_amount0: number;
}

export interface IApiOneDropsDetailData {
  accountaddress: string;
  avatar: string;
  bgcolor: string;
  coverimgurl: string;
  creator: string;
  description: string;
  dropdate: number;
  instagram: string;
  poolsinfo: OriginIPoolNftItem[];
  title: string;
  twitter: string;
  website: string;
  videourl: string;
  state: DropType;
  blindboxinfo?: {
    collection: string;
    notsaled: number;
    price: string;
    totalsupply: number;
  }
}

export interface IApiOneDropsDetail {
  code: number;
  data?: IApiOneDropsDetailData;
  msg?: string;
}
