export const DEBOUNCE = 300;

// const GH_URL = 'https://nftview.bounce.finance/'
const GH_URL = 'https://nftview.bounce.finance/v1/bsc_test/'
// axios default url
export const AXIOS_DEFAULT = GH_URL
export const AXIOS_URL_MATCH_ARRAY = [
  {key: '[GH]', value: GH_URL},
]

export const AUCTION_TYPE = {
  FixedSwap: 'fixed-swap',
  EnglishAuction: 'english-auction',
}

export const NFT_CATEGORY = {
  FineArts: 'Fine Arts',
  Sports: 'Sports',
  ComicBooks: 'Comics',
}

export const ITEM_CATEGORY = {
  All: 'All',
  Image: 'Image',
  Video: 'Video',
  Audio: 'Audio',
  Game: 'Game',
  Others: 'Others'
}

export const ITEM_SELL_STATUS = {
  All: 'All',
  OnSale: 'On sale',
  NotOnSale: 'Not on sale'
}