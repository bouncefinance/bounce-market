export const DEBOUNCE = 300;

const produceHost = ['127.0.0.1', 'bounce-market.bounce.finance', 'cnmarket.bounce.finance', 'fangible']
let isProDev = false
const hostname = window.location.hostname
produceHost.forEach(item => {
  if (hostname.includes(item)) {
    isProDev = true
  }
})
const GH_URL = isProDev ? 'https://nftview.bounce.finance/v1/bsc' : 'https://nftview.bounce.finance/v1/bsc_test'
const GH_V2_URL = isProDev ? 'https://nftview.bounce.finance/v2/bsc' : 'https://nftview.bounce.finance/v2/bsc'

// axios default url
export const AXIOS_DEFAULT = GH_URL
export const AXIOS_URL_MATCH_ARRAY = [
  { key: '[GH]', value: GH_URL },
  { key: '[V2]', value: GH_V2_URL },
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