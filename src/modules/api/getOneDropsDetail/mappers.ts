import { Address } from 'modules/common/types/unit';
import { IApiOneDropsDetailItem } from './types';

export interface IDropDetails {
  accountAddress: Address;
  bgColor: string;
  coverImgUrl: string;
  createdAt: Date;
  creatorUrl: string;
  description: string;
  dropDate: Date;
  fileUrl: string;
  instagram: string;
  itemName: string;
  nfts: number;
  price: string;
  title: string;
  twitter: string;
  userName: string;
  website: string;
}

export const mapDropDetails = (data: IApiOneDropsDetailItem): IDropDetails => {
  return {
    accountAddress: data.accountaddress,
    bgColor: data.bgcolor,
    coverImgUrl: data.coverimgurl,
    createdAt: new Date(data.created_at),
    creatorUrl: data.creatorurl,
    description: data.description,
    dropDate: new Date(data.dropdate * 1000),
    fileUrl: data.fileurl,
    instagram: data.instagram,
    itemName: data.itemname,
    nfts: data.nfts,
    price: data.price,
    title: data.title,
    twitter: data.twitter,
    userName: data.username,
    website: data.website,
  };
};
