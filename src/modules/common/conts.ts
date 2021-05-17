import { TokenSymbol } from './types/TokenSymbol';

export const API_BASE = process.env.REACT_APP_API_BASE;
export const FANGIBLE_URL = process.env.REACT_APP_FANGIBLE_URL;
export const NFTVIEW_URL_V2 = process.env.REACT_APP_NFTVIEW_URL_V2;
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

// TODO: at the end all features should be activated
export const featuresConfig = {
  profileSocialLinks: false,
  artists: false,
  loadMoreNFTs: false,
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
