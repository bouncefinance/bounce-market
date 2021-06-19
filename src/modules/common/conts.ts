import { TokenSymbol } from './types/TokenSymbol';

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
  nftDetailsCreator: false,
  nftDetailsCount: true,
  subscribers: false,
  profileSortTabs: false,
  profileFollowers: false,
  /**
   * poolDetail config
   */
  infoTabs: false,
  nftDetailsHistory: false,
  nftDetailsBids: false,
  nftDetailsOwners: false,
  nftDetailsTokenInfo: false,
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
  [BlockchainNetworkId.mainnet]: TokenSymbol.ETH,
  [BlockchainNetworkId.ropsten]: TokenSymbol.ETH,
  [BlockchainNetworkId.rinkeby]: TokenSymbol.ETH,
  [BlockchainNetworkId.goerli]: TokenSymbol.ETH,
  [BlockchainNetworkId.dev]: TokenSymbol.ETH,
  [BlockchainNetworkId.classic]: TokenSymbol.ETH,
  [BlockchainNetworkId.mordor]: TokenSymbol.ETH,
  [BlockchainNetworkId.kotti]: TokenSymbol.ETH,
  [BlockchainNetworkId.smartchain]: TokenSymbol.BNB,
  [BlockchainNetworkId.smartchainTestnet]: TokenSymbol.BNB,
  [BlockchainNetworkId.heco]: TokenSymbol.HT,
};

export function getNativeTokenSymbol(chainId: BlockchainNetworkId) {
  return NativeTokens[chainId];
}
