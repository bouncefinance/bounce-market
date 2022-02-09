import { ChainSymbol, TokenSymbol } from './types/TokenSymbol';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ZERO_ADDRESS2 = '0x000000000000000000000000000000000000dead';

export const isOtherPlatformCode = 0;

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
  /**
   * Now this feature is not implemented in the backend
   */
  dropDetailsVideo: true,
  collectionFollow: false,
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
  matic = 137,
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
  [BlockchainNetworkId.matic]: TokenSymbol.MATIC,
};

const ChainsInfo = {
  [BlockchainNetworkId.mainnet]: { chainSymbolName: ChainSymbol.ETH },
  [BlockchainNetworkId.ropsten]: { chainSymbolName: ChainSymbol.ETH },
  [BlockchainNetworkId.rinkeby]: { chainSymbolName: ChainSymbol.ETH },
  [BlockchainNetworkId.goerli]: { chainSymbolName: ChainSymbol.ETH },
  [BlockchainNetworkId.dev]: { chainSymbolName: ChainSymbol.ETH },
  [BlockchainNetworkId.classic]: { chainSymbolName: ChainSymbol.ETH },
  [BlockchainNetworkId.mordor]: { chainSymbolName: ChainSymbol.ETH },
  [BlockchainNetworkId.kotti]: { chainSymbolName: ChainSymbol.ETH },
  [BlockchainNetworkId.smartchain]: { chainSymbolName: ChainSymbol.BSC },
  [BlockchainNetworkId.smartchainTestnet]: { chainSymbolName: ChainSymbol.BSC },
  [BlockchainNetworkId.heco]: { chainSymbolName: ChainSymbol.HECO },
  [BlockchainNetworkId.matic]: { chainSymbolName: ChainSymbol.Polygon },
};

export function getChainSymbol(chainId: BlockchainNetworkId) {
  return ChainsInfo[chainId];
}

export function getNativeTokenSymbol(chainId: BlockchainNetworkId) {
  return NativeTokens[chainId];
}

const BlockChainExplorerAddress: {
  [key in BlockchainNetworkId]: String;
} = {
  [BlockchainNetworkId.mainnet]: 'https://etherscan.io/',
  [BlockchainNetworkId.ropsten]: 'https://ropsten.etherscan.io/',
  [BlockchainNetworkId.rinkeby]: 'https://rinkeby.etherscan.io/',
  [BlockchainNetworkId.goerli]: 'https://goerli.etherscan.io/',
  [BlockchainNetworkId.dev]: '',
  [BlockchainNetworkId.classic]: '',
  [BlockchainNetworkId.mordor]: '',
  [BlockchainNetworkId.kotti]: '',
  [BlockchainNetworkId.smartchain]: 'https://bscscan.com/',
  [BlockchainNetworkId.smartchainTestnet]: 'https://bscscan.com/',
  [BlockchainNetworkId.heco]: 'https://hecoinfo.com/',
  [BlockchainNetworkId.matic]: 'https://polygonscan.com/',
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
  [BlockchainNetworkId.matic]: 'PolygonScan',
};

export const getBlockChainExplorerName = (chainId: BlockchainNetworkId) =>
  BlockChainExplorerName[chainId];

const BlockChainTokenSymbol: {
  [key in BlockchainNetworkId]: String;
} = {
  [BlockchainNetworkId.mainnet]: TokenSymbol.ETH,
  [BlockchainNetworkId.ropsten]: TokenSymbol.ETH,
  [BlockchainNetworkId.rinkeby]: TokenSymbol.ETH,
  [BlockchainNetworkId.goerli]: TokenSymbol.ETH,
  [BlockchainNetworkId.dev]: '',
  [BlockchainNetworkId.classic]: '',
  [BlockchainNetworkId.mordor]: '',
  [BlockchainNetworkId.kotti]: '',
  [BlockchainNetworkId.smartchain]: TokenSymbol.BNB,
  [BlockchainNetworkId.smartchainTestnet]: TokenSymbol.BNB,
  [BlockchainNetworkId.heco]: TokenSymbol.HT,
  [BlockchainNetworkId.matic]: TokenSymbol.MATIC,
};

export const DefaultTokenSymbol = TokenSymbol.ETH;
export const DefaultChainId = BlockchainNetworkId.mainnet;

export const getTokenSymbol = (chainId: BlockchainNetworkId) =>
  BlockChainTokenSymbol[chainId] || DefaultTokenSymbol;

  export enum NftFtKeys {
    NFT,
    FT
  }

export  const NftFtTabs = [
    {
      label: 'NFT',
      value: NftFtKeys.NFT,
    },
    {
      label: 'FT',
      value: NftFtKeys.FT,
    },
  ]