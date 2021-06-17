import { TokenSymbol } from './types/TokenSymbol';

export const API_BASE = process.env.REACT_APP_API_BASE;
export const POOLS_URL = process.env.REACT_APP_POOLS_URL;
export const POOL_DETAILS_URL = process.env.REACT_APP_POOL_DETAILS_URL;
export const FANGIBLE_URL = process.env.REACT_APP_FANGIBLE_URL;
export const NFTVIEW_URL_V2 = process.env.REACT_APP_NFTVIEW_URL_V2;
export const REACT_APP_BRAND_BASEURI = process.env.REACT_APP_BRAND_BASEURI;
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

// TODO: at the end all features should be activated
export const featuresConfig = {
  /**
   * There is no data on the backend side
   */
  profileSocialLinks: false,
  /**
   * Feature is not implemented
   */
  artists: false,
  /**
   * Page is not created yet
   */
  howItWorkPage: false,
  /**
   * No data provided for this
   */
  nftCardOwnerInfo: true,
  /**
   * No has profile pages yet
   */
  usersInSearch: false,
  /**
   * Hidden, as for now the own profile is displayed without a unique URL
   * and it cannot be shared
   */
  ownProfileSharing: true,
  /**
   * Hidden, as for now the own brand is displayed without a unique URL
   * and it cannot be shared
   */
  ownBrandSharing: false,
  nftLikes: false,
  nftItemsSortSelect: false,
  nftDetailsLikesCount: false,
  nftDetailsCreator: true,
  nftDetailsCount: true,
  subscribers: false,
  profileSortTabs: false,
  profileFollowers: false,
  /**
   * poolDetail config
   */
  infoTabs: true,
  nftDetailsHistory: true,
  nftDetailsBids: false,
  nftDetailsOwners: false,
  nftDetailsTokenInfo: true,
};

export enum BlockchainNetworkId {
  mainnet = 1,
  ropsten = 3,
  rinkeby = 4,
  goerli = 5,
  dev = 2018,
  classic = 61,
  mordor = 63,
  kotti = 6,
  smartchain = 56,
  smartchainTestnet = 97,
  heco = 128,
}

const NativeTokens: {
  [key in BlockchainNetworkId]: TokenSymbol;
} = {
  [BlockchainNetworkId.mainnet]: 'ETH',
  [BlockchainNetworkId.ropsten]: 'ETH',
  [BlockchainNetworkId.rinkeby]: 'ETH',
  [BlockchainNetworkId.goerli]: 'ETH',
  [BlockchainNetworkId.dev]: 'ETH',
  [BlockchainNetworkId.classic]: 'ETH',
  [BlockchainNetworkId.mordor]: 'ETH',
  [BlockchainNetworkId.kotti]: 'ETH',
  [BlockchainNetworkId.smartchain]: 'BNB',
  [BlockchainNetworkId.smartchainTestnet]: 'BNB',
  [BlockchainNetworkId.heco]: 'HT',
};

export function getNativeTokenSymbol(chainId: BlockchainNetworkId) {
  return NativeTokens[chainId];
}
