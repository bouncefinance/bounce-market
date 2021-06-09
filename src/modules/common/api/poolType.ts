import { AuctionType } from 'modules/overview/api/auctionType';

export enum PoolType {
  Unknown,
  FixedSwap,
  EnglishAuction,
}

export const auctionTypeMap = {
  [`${PoolType.FixedSwap}`]: AuctionType.FixedSwap,
  [`${PoolType.EnglishAuction}`]: AuctionType.EnglishAuction,
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
