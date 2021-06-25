export const DEBOUNCE = 300;

const produceHost = ['127.0.0.1', 'marke.bounce.finance', 'cnmarket.bounce.finance', 'fangible']
const hostname = window.location.hostname
const isProDev = produceHost.some(hostItem => {
  return hostname.includes(hostItem) ? true : false
})

const getNetwork = (chainID) => {
  chainID = parseInt(chainID)
  switch (chainID) {
    case 1:
      return []
    case 56:
      return [isProDev?'https://api1-bsc.fangible.com/v1/bsc':'https://api1-bsc.fangible.com/v1/bsc_test', 'https://nftview.bounce.finance/v2/bsc']
    case 128:
      return ['https://api1-heco.fangible.com/v1/heco', 'https://nftview.bounce.finance/v2/heco']
    default:
      return ['https://api1-heco.fangible.com/v1/heco', 'https://nftview.bounce.finance/v2/heco']
  }
}




const currentChainId = window.localStorage.getItem('currentChainId')
const [GH_URL, GH_V2_URL] = getNetwork(currentChainId)

// const GH_URL = isProDev ? `https://api1-bsc.fangible.com/v1/bsc` : `https://api1-bsc.fangible.com/v1/bsc_test`
// const GH_V2_URL = isProDev ? `https://nftview.bounce.finance/v2/bsc` : `https://nftview.bounce.finance/v2/bsc`

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
  FineArts: 'FineArts',
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