export enum AuctionType {
  FixedSwap = 'fixed-swap',
  EnglishAuction = 'english-auction',
}

export const AuctionTypeMap = {
  1: AuctionType.FixedSwap,
  2: AuctionType.EnglishAuction,
};

interface IAuctionTypeMap {
  1: AuctionType;
  2: AuctionType;
}

export type AuctionTypeKeys = keyof IAuctionTypeMap;
