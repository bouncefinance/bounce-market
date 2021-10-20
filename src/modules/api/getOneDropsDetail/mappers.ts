import BigNumber from 'bignumber.js';
import { AuctionType } from 'modules/api/common/auctionType';
import { IPoolNftItem } from 'modules/api/common/poolType';
import { Address } from 'modules/common/types/unit';
import { mapPoolData } from 'modules/pools/actions/map';
import {
  DropsDetailPoolState,
  DropType,
  IApiOneDropsDetailData,
} from './types';

export interface IDropDetailsPoolInfo {
  fileUrl: string;
  name: string;
  poolId: number;
  poolType: AuctionType;
  price: BigNumber;
  state: DropsDetailPoolState;
  swappedAmount0: number;
  tokenAmount0: number;
}

export interface IDropDetails {
  accountAddress: Address;
  avatar: string;
  bgColor: string;
  coverImgUrl: string;
  creator: string;
  description: string;
  dropDate: Date;
  instagram: string;
  poolsInfo: IPoolNftItem[];
  title: string;
  twitter: string;
  website: string;
  videourl: string;
  dropType: DropType;
  blindboxinfo?: {
    collection: string;
    notsaled: number;
    price: string;
    totalsupply: number;
  }
}

export const mapDropDetails = (data: IApiOneDropsDetailData): IDropDetails => {
  return {
    accountAddress: data.accountaddress,
    avatar: data.avatar,
    creator: data.creator,
    bgColor: data.bgcolor,
    coverImgUrl: data.coverimgurl,
    description: data.description,
    dropDate: new Date(data.dropdate * 1000),
    instagram: data.instagram,
    poolsInfo: mapPoolData(data?.poolsinfo ?? []),
    title: data.title,
    twitter: data.twitter,
    website: data.website,
    videourl: data.videourl,
    dropType: data.state,
    blindboxinfo: data.blindboxinfo
  };
};
