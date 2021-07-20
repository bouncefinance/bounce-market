export enum AuctionType {
  FixedSwap = 'fixed-swap',
  EnglishAuction = 'english-auction',
  TimeFixedSwap = 'time-english-auction',
  TimeEnglishAuction = 'time-english-auction',
}

export type AuctionTypeKeys = 1 | 2 | 3 | 4;
