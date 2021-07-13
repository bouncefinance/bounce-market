import { NftType } from 'modules/api/common/NftType';
import { Channel } from 'modules/createNFT/actions/createNft';

export interface IApiGetOneItemByIdData {
  balance: string;
  category: 'image' | 'video';
  channel: Channel;
  contractaddress: string;
  created_at: string;
  description: string;
  externallink: string;
  fileurl: string;
  id: number;
  itemname: string;
  itemsymbol: 'BOUNCE';
  likecount: number;
  litimgurl: string;
  metadata: string;
  owneraddress: string;
  standard: NftType;
  supply: number;
}

export interface IApiGetOneItemById {
  code: number;
  data?: IApiGetOneItemByIdData;
  msg?: string;
}
