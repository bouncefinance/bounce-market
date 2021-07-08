export interface IGetOneDropsDetailParams {
  dropsid: number;
  limit: number;
  offset: number;
  poolstate: number;
}

export interface IApiOneDropsDetailItem {
  accountaddress: string;
  bgcolor: string;
  coverimgurl: string;
  created_at: string;
  creatorurl: string;
  description: string;
  dropdate: number;
  fileurl: string;
  instagram: string;
  itemname: string;
  nfts: number;
  price: string;
  title: string;
  twitter: string;
  username: string;
  website: string;
}

export interface IApiOneDropsDetail {
  code: number;
  data?: IApiOneDropsDetailItem[];
  msg?: string;
  total?: number;
}
