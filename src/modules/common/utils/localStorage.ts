import { BlockchainNetworkId } from '../conts';

export const getJWTToken = () => {
  return localStorage.token;
};
export const setJWTToken = (token: string) => {
  localStorage.token = token;
};
export const setChainId = (id: number) => {
  localStorage.chainId = id;
};

export const getChainId = () => {
  return localStorage.chainId && parseInt(localStorage.chainId, 10) !== 0
    ? parseInt(localStorage.chainId, 10)
    : // : BlockchainNetworkId.mainnet;
      // TODO
      BlockchainNetworkId.rinkeby;
  // TODO chainId may invalid
};
