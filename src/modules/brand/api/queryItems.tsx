

export interface IItemInfo {
  category: string;
  channel: string;
  contractaddress: string;
  created_at: string;
  description: string;
  externallink: string;
  fileurl: string;
  id: number;
  itemname: string;
  itemsymbol: string;
  likecount: number;
  litimgurl: string;
  metadata: string;
  owneraddress: string;
  standard: number;
  supply: number;
}

export interface IApiItemInfo {
  code: 1 | number;
  data: IItemInfo[];
}