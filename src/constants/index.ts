import { InjectedConnector } from '@web3-react/injected-connector';
import NetworkConnector from 'modules/web3/utils/netWork';

const MainChaid = 56;
export const NetworkContextName = 'NETWORK';
export const connectorLocalStorageKey = 'connectorId';
export const tokenLocalStorageKey = 'token';
export const injected = new InjectedConnector({
  supportedChainIds: [MainChaid],
});

export const RPC = {
  1: 'https://mainnet.infura.io/v3/0b500c5f885b43a4ab192e8048f6fa88',
  4: 'https://rinkeby.infura.io/v3/8f6d3d5d7a1442a38d9e8050c31c1884',
  56: 'https://bsc-dataseed4.binance.org',
};

export const NETWORK_CHAIN_ID: number = parseInt(
  process.env.REACT_APP_CHAIN_ID ?? MainChaid.toString(),
);
export const network = new NetworkConnector({
  urls: {
    [NETWORK_CHAIN_ID]: 'https://bsc-dataseed1.defibit.io',
  },
});
