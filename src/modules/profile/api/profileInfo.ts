export interface IApiProfileInfo {
  code: number;
  data?: {
    accountaddress: string;
    bandimgurl: string;
    bio: string;
    email: string;
    followcount: number;
    fullname: string;
    imgurl: string;
    username: string;
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
  };
}
