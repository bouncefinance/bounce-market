import { TokenSymbol } from './types/TokenSymbol';

export const API_BASE = process.env.REACT_APP_API_BASE;
export const FANGIBLE_URL = process.env.REACT_APP_FANGIBLE_URL;
export const NFTVIEW_URL_V2 = process.env.REACT_APP_NFTVIEW_URL_V2;
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
   * Feature is not implemented
   */
  loadMoreNFTs: false,
  /**
   * Page is not created yet
   */
  howItWorkPage: false,
  /**
   * No data provided for this
   */
  nftCardOwnerInfo: false,
  /**
   * Hidden, as for now the own profile is displayed without a unique URL
   * and it cannot be shared
   */
  ownProfileSharing: false,
  /**
   * Hidden, as for now the own brand is displayed without a unique URL
   * and it cannot be shared
   */
  ownBrandSharing: false,
  /**
   * Feature is not fully implemented
   */
  nftLikes: false,
  /**
   * Feature is not implemented
   */
  nftItemsSortSelect: false,
  nftDetailsCreator: false,
  nftDetailsCount: false,
  nftDetailsHistory: false,
  nftDetailsBids: false,
  nftDetailsOwners: false,
  nftDetailsTokenInfo: false,
  subscribers: false,
  profileSortTabs: false,
  profileActivity: false,
  profileLiked: false,
  profileFollowers: false,
  infoTabs: false,
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
