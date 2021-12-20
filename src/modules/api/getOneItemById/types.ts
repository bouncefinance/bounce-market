import { NftType } from 'modules/api/common/NftType';
import { UserRoleType } from 'modules/common/actions/queryAccountInfo';
import { Channel } from 'modules/createNFT/actions/createNft';
import { NFTCategoryType } from 'modules/overview/actions/fetchItemsByFilter';
import type { AuctionTypeKeys } from '../common/auctionType';

export interface IApiGetOneItemByIdData {
  balance: string;
  category: NFTCategoryType;
  channel: Channel;
  contractaddress: string;
  created_at: string;
  description: string;
  externallink: string;
  fileurl: string;
  id: string;
  tokenid: string;
  itemname: string;
  itemsymbol: 'BOUNCE';
  likecount: number;
  mylikecount: number;
  litimgurl: string;
  metadata: string;
  owneraddress: string;
  standard: NftType;
  supply: number;
  open_at: number;
  auctiontype: AuctionTypeKeys;
  identity: UserRoleType;
}

export interface IApiGetOneItemById {
  code: number;
  data?: IApiGetOneItemByIdData;
  msg?: string;
}
