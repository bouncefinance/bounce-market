import { ProductCardCategoryType } from 'modules/common/components/ProductCard';
import { isOtherPlatformCode } from 'modules/common/conts';
import { INftAvatars, IPoolAvatars, NftType } from './NftType';

export type isPlatformType = 0 | 1;
export enum PlatformType {
  OTHER = isOtherPlatformCode,
  SELF = 1,
}

export interface IOriginNftItem extends IPoolAvatars {
  category: ProductCardCategoryType;
  contractaddress: string;
  isplatform: isPlatformType;
  fileurl: string;
  likecount: number;
  mylikecount: number;
  name: string;
  itemname?: string;
  tokenid: number;
  supply: number;
  balance: number;
  standard: NftType;
}

export interface INftItem {
  category: ProductCardCategoryType;
  fileUrl: string;
  likeCount: number;
  isLike: boolean;
  name: string;
  tokenId: number;
  poolId?: number;
  itemId: number;
  avatars: INftAvatars;
  isItemType: boolean;
  supply: number;
  balance: number;
  contractAddress: string;
  standard?: NftType;
}
