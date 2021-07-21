import BigNumber from 'bignumber.js';
import { AuctionType } from 'modules/api/common/auctionType';
import { auctionTypeMap } from 'modules/api/common/poolType';
import { Address } from 'modules/common/types/unit';
import Web3 from 'web3';
import {
  DropsDetailPoolState,
  DropType,
  IApiDropsDetailPoolInfo,
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
  poolsInfo: IDropDetailsPoolInfo[];
  title: string;
  twitter: string;
  website: string;
  videourl: string;
  dropType: DropType;
}

export const mapDropDetailsPoolInfo = (
  data: IApiDropsDetailPoolInfo,
): IDropDetailsPoolInfo => {
  return {
    fileUrl: data.fileurl,
    name: data.name,
    poolId: data.poolid,
    poolType: auctionTypeMap[data.pooltype],
    price: new BigNumber(Web3.utils.fromWei(data.price)),
    state: data.state,
    swappedAmount0: data.swapped_amount0,
    tokenAmount0: data.token_amount0,
  };
};

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
    poolsInfo: data.poolsinfo.map(mapDropDetailsPoolInfo),
    title: data.title,
    twitter: data.twitter,
    website: data.website,
    videourl: data.videourl,
    dropType: data.state,
  };
};
