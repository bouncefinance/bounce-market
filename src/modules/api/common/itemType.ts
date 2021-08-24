import { ProductCardCategoryType } from 'modules/common/components/ProductCard';
import { INftAvatars, IPoolAvatars } from './NftType';

export interface IOriginNftItem extends IPoolAvatars {
  category: ProductCardCategoryType;
  contractaddress: string;
  isplatform: 1 | 0;
  fileurl: string;
  likecount: number;
  mylikecount: number;
  name: string;
  tokenid: number;
  supply: number;
  balance: number;
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
}
