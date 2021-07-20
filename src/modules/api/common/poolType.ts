import { AuctionType } from 'modules/api/common/auctionType';

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
