import Web3 from 'web3';

declare global {
  interface Window {
    BinanceChain: any;
    clover?: any;
    web3: Web3;
  }
}
