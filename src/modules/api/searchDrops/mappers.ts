import { ChainType } from 'modules/account/hooks/chainConfig';
import { IApiSearchDropsItem } from './types';

export enum DROPTYPE {
  DROP = 1,
  BLINDBOX = 2,
  AIRDROP = 3,
}

export interface ISearchDropsItem {
  accountAddress: string;
  bgColor: string;
  coverImgUrl: string;
  createdAt: Date;
  description: string;
  display: number;
  dropDate: Date;
  id: number;
  instagram: string;
  nfts: number;
  state: number;
  title: string;
  twitter: string;
  updatedAt: Date;
  username: string;
  website: string;
  avatar: string;
  dropType: DROPTYPE;
  blindcoverimgurl: string;
  directLink?: string;
  tarChain?: ChainType;
  comingTime?: string;
}

export const mapSearchDropsItem = (
  item: IApiSearchDropsItem,
): ISearchDropsItem => {
  return {
    accountAddress: item.accountaddress,
    bgColor: item.bgcolor,
    coverImgUrl: item.coverimgurl,
    createdAt: new Date(item.created_at),
    description: item.description,
    display: item.display,
    dropDate: new Date(item.dropdate * 1000),
    id: item.id,
    instagram: item.instagram,
    nfts: item.nfts,
    state: item.state,
    title: item.title,
    twitter: item.twitter,
    updatedAt: new Date(item.updated_at),
    username: item.username,
    website: item.website,
    avatar: item.avatar,
    dropType: item.droptype,
    blindcoverimgurl: item.blindcoverimgurl,
    directLink: item.directLink,
    tarChain: item.tarChain,
    comingTime: item.comingTime,
  };
};
