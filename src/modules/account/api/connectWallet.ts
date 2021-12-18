import Web3Modal, { IProviderOptions } from './web3modal';
import { PALETTE } from '../../themes/mainTheme';
import { fade, lighten } from '@material-ui/core';
import WalletConnectProvider from '@walletconnect/web3-provider';
import binanceWalletLogo from '../assets/binanceWallet.svg';
import cloverWalletLogo from '../assets/clover.svg';
import { BscConnector } from '@binance-chain/bsc-connector';
import Web3 from 'web3';
import { t } from '../../i18n/utils/intl';

export const RPC = {
  1: 'https://mainnet.infura.io/v3/0b500c5f885b43a4ab192e8048f6fa88',
  4: 'https://rinkeby.infura.io/v3/8f6d3d5d7a1442a38d9e8050c31c1884',
  56: 'https://bsc-dataseed4.binance.org',
};
const OPEN_CLOVER = false;
export async function connectWallet(cacheProvider?: boolean) {
  const providerOptions: IProviderOptions = {
    ...(window.BinanceChain
      ? {
          'custom-binancewallet': {
            display: {
              logo: binanceWalletLogo,
              name: t('connect-wallet.custom-binancewallet.name'),
              description: t('connect-wallet.custom-binancewallet.description'),
            },
            package: null,
            options: {},
            connector: async () => {
              const connector = new BscConnector({
                // 56 - mainnet
                // 97 - testnet
                supportedChainIds: [56, 97],
              });
              await connector.activate();
              return await connector.getProvider();
            },
          },
        }
      : {}),
    ...(OPEN_CLOVER
      ? {
          'custom-clover': {
            display: {
              logo: cloverWalletLogo,
              name: t('connect-wallet.custom-clover.name'),
              description: t('connect-wallet.custom-clover.description'),
            },
            package: {
              required: [],
            },
            options: {},
            connector: async () => {
              // TODO
              return {};
            },
          },
        }
      : {}),
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: RPC,
      },
    },
  };

  const modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
    theme: {
      background: PALETTE.background.paper,
      main: PALETTE.text.primary,
      secondary: fade(PALETTE.text.primary, 0.5),
      border: PALETTE.background.default,
      hover: lighten(PALETTE.background.paper, 0.03),
    },
  });

  const provider = await modal.connect();
  const web3 = new Web3(provider);
  return [web3, provider] as [Web3, any];
}
