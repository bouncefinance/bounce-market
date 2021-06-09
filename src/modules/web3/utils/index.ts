import Web3 from 'web3';
import { HttpProviderOptions } from 'web3-core-helpers';
import { RPC } from 'constants/index';

const RPC_URL = RPC[56];
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
  timeout: 10000,
} as HttpProviderOptions);
const web3NoAccount = new Web3(httpProvider);

export const getWeb3NoAccount = () => {
  return web3NoAccount;
};
