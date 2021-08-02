import { UserRoleType } from 'modules/common/actions/queryAccountInfo';

export interface IApiProfileInfo {
  code: number;
  msg?: string;
  data?: {
    accountaddress: string;
    bandimgurl: string;
    bio: string;
    email: string;
    followcount: number;
    fullname: string;
    imgurl: string;
    username: string;
    website: string;
    instagram: string;
    twitter: string;
    facebook: string;
    followingcount?: number;
    identity?: UserRoleType;
  };
}

export interface IProfileInfo {
  accountAddress: string;
  bgImgUrl: string;
  bio: string;
  email: string;
  followCount: number;
  fullName: string;
  imgUrl: string;
  username: string;
  website?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  identity?: UserRoleType;
  followersCount?: number;
  followingCount?: number;
}

export function mapProfileInfo({
  data,
}: IApiProfileInfo): IProfileInfo | undefined {
  if (!data) {
    return undefined;
  }

  return {
    accountAddress: data.accountaddress,
    bgImgUrl: data.bandimgurl,
    bio: data.bio,
    email: data.email,
    followCount: data.followcount,
    fullName: data.fullname,
    imgUrl: data.imgurl,
    username: data.username,
    website: data.website,
    instagram: data.instagram,
    twitter: data.twitter,
    facebook: data.facebook,
    identity: data.identity,
    followersCount: data.followcount,
    followingCount: data.followingcount,
  };
}
