import { Address } from 'modules/common/types/unit';
import { IApiTopArtistItem } from './types';

export interface ITopArtistItem {
  id: number;
  bounceId: number;
  state: number;
  display: number;
  identity: number;
  email: string;
  bandImgUrl: string;
  accountAddress: Address;
  userName: string;
  fullName: string;
  bio: string;
  imgUrl: string;
  website: string;
  instagram: string;
  twitter: string;
  facebook: string;
  createdAt: Date;
  updatedAt: Date;
  topWeight: number;
  hotWeight: number;
}

export const mapTopArtistItem = (item: IApiTopArtistItem): ITopArtistItem => {
  return {
    id: item.id,
    bounceId: item.bounceid,
    state: item.state,
    display: item.display,
    identity: item.identity,
    email: item.email,
    bandImgUrl: item.bandimgurl,
    accountAddress: item.accountaddress,
    userName: item.username,
    fullName: item.fullnam,
    bio: item.bio,
    imgUrl: item.imgurl,
    website: item.website,
    instagram: item.instagram,
    twitter: item.twitter,
    facebook: item.facebook,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at),
    topWeight: item.top_weight,
    hotWeight: item.hot_weight,
  };
};
