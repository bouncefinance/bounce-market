import { TokenSymbol } from './types/TokenSymbol';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

// TODO: at the end all features should be activated
export const featuresConfig = {
  /**
   * There is no data on the backend side
   */
  profileSocialLinks: true,
  /**
   * Feature is not implemented
   * https://fangible.atlassian.net/browse/FAN-209
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
   * Hidden, as for now the own profile is displayed without a unique URL
   * and it cannot be shared
   */
  ownProfileSharing: true,
  /**
   * Hidden, as for now the own brand is displayed without a unique URL
   * and it cannot be shared
   */
  ownBrandSharing: false,
  nftLikes: true,
  nftItemsSortSelect: false,
  nftDetailsLikesCount: true,
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
  nftDetailsBids: true,
  nftDetailsOwners: true,
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

const BlockChainExplorerAddress: {
  [key in BlockchainNetworkId]: String;
} = {
  [BlockchainNetworkId.mainnet]: 'https://etherscan.io/address/',
  [BlockchainNetworkId.ropsten]: 'https://ropsten.etherscan.io/address/',
  [BlockchainNetworkId.rinkeby]: 'https://rinkeby.etherscan.io/address/',
  [BlockchainNetworkId.goerli]: 'https://goerli.etherscan.io/address/',
  [BlockchainNetworkId.dev]: '',
  [BlockchainNetworkId.classic]: '',
  [BlockchainNetworkId.mordor]: '',
  [BlockchainNetworkId.kotti]: '',
  [BlockchainNetworkId.smartchain]: 'https://bscscan.com/address/',
  [BlockchainNetworkId.smartchainTestnet]: 'https://bscscan.com/address/',
  [BlockchainNetworkId.heco]: 'https://hecoinfo.com/address/',
};

export const getBlockChainExplorerAddress = (chainId: BlockchainNetworkId) =>
  BlockChainExplorerAddress[chainId];

const BlockChainExplorerName: {
  [key in BlockchainNetworkId]: String;
} = {
  [BlockchainNetworkId.mainnet]: 'ETHScan',
  [BlockchainNetworkId.ropsten]: 'RopstenScan',
  [BlockchainNetworkId.rinkeby]: 'RinkebyScan',
  [BlockchainNetworkId.goerli]: 'GoerliScan',
  [BlockchainNetworkId.dev]: '',
  [BlockchainNetworkId.classic]: '',
  [BlockchainNetworkId.mordor]: '',
  [BlockchainNetworkId.kotti]: '',
  [BlockchainNetworkId.smartchain]: 'BSCScan',
  [BlockchainNetworkId.smartchainTestnet]: 'BSCScan',
  [BlockchainNetworkId.heco]: 'HecoScan',
};

export const getBlockChainExplorerName = (chainId: BlockchainNetworkId) =>
  BlockChainExplorerName[chainId];
