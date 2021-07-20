export enum AuctionType {
  FixedSwap = 'fixed-swap',
  EnglishAuction = 'english-auction',
  FixedSwap_Timing = 'fixed-swap-timing',
  EnglishAuction_Timing = 'english-auction-timing',
}

export enum AuctionTypeState {
  Unknown,
  'fixed-swap',
  'english-auction',
  'fixed-swap-timing',
  'english-auction-timing',
}

export type AuctionTypeKeys = 1 | 2 | 3 | 4;
