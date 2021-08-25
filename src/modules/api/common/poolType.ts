import BigNumber from 'bignumber.js';
import { AuctionType } from 'modules/api/common/auctionType';
import { UserRoleType } from 'modules/common/actions/queryAccountInfo';
import { ProductCardCategoryType } from 'modules/common/components/ProductCard';
import { INftCardHelpsParams } from 'modules/common/utils/nftCard';
import { AuctionState } from './AuctionState';
import { FixedSwapState } from './FixedSwapState';
import { isPlatformType } from './itemType';
import { INftAvatars, IPoolAvatars } from './NftType';

export enum PoolType {
  Unknown,
  FixedSwap,
  EnglishAuction,
  FixedSwapTiming,
  EnglishAuctionTiming,
}

export const auctionTypeMap = {
  [`${PoolType.FixedSwap}`]: AuctionType.FixedSwap,
  [`${PoolType.EnglishAuction}`]: AuctionType.EnglishAuction,
  [`${PoolType.FixedSwapTiming}`]: AuctionType.FixedSwap_Timing,
  [`${PoolType.EnglishAuctionTiming}`]: AuctionType.EnglishAuction_Timing,
};

const flipKeyValues = (originalObj: {
  [key: string]: string;
}): { [key: string]: string } => {
  if (typeof originalObj === 'object' && originalObj !== null) {
    return Object.entries(originalObj).reduce(
      (acc: { [key: string]: string }, [key, value]: [string, string]) => {
        acc[value] = key;
        return acc;
      },
      {},
    );
  } else {
    return {};
  }
};

export const poolTypeMap = flipKeyValues(auctionTypeMap);

export interface OriginIPoolNftItem extends IPoolAvatars {
  open_at: number | 0;
  close_at: number | 0;
  created_at: string;
  pooltype: PoolType;
  auction_type?: PoolType;
  poolweight: string;
  price: string;
  state: 0 | 1;
  amount_max1: string;
  amount_min1: string;
  amount_min_incr1: string;
  amount_total1: string;
  last_bidder: string;
  // TODO
  Standard: number;
  Supply: number;
  creator_claimed: number;
  bidder_claimed: number;
  duration: number;
  itemname: string;
  creatorurl: string;
  // pool creatorname
  username: string;
  fileurl: string;
  identity: UserRoleType;
  poolid: number;
  pool_id?: number;
  likecount: number;
  mylikecount: number;
  // contract
  token0: string;
  tokenid: number;
  swapped_amount0: number;
  token_amount0: number;
  category: ProductCardCategoryType;
  description?: string;
  isplatform?: isPlatformType;
}

export interface IPoolNftItem
  extends Omit<Omit<OriginIPoolNftItem, 'price'>, 'state'> {
  avatars: INftAvatars;
  state: FixedSwapState | AuctionState;
  price: BigNumber;
  openAt: Date;
  closeAt: Date;
  poolType: AuctionType;
  isLike: boolean;
  tokenId?: number;
  itemName: string;
  poolId?: number;
  likeCount?: number;
  fileUrl: string;
  nftCardOption: INftCardHelpsParams;
  isLive: boolean;
  isClose: boolean;
}
