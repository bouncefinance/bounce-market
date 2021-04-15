import Web3Modal, { IProviderOptions } from 'web3modal';
import { PALETTE } from '../../themes/mainTheme';
import { fade, lighten } from '@material-ui/core';
import WalletConnectProvider from '@walletconnect/web3-provider';
import binanceWalletLogo from '../assets/binanceWallet.svg';
import { BscConnector } from '@binance-chain/bsc-connector';
import huobiLogo from '../assets/huobi.svg';
import imTokenLogo from '../assets/imToken.svg';
import mathLogo from '../assets/math.svg';
import trustWalletLogo from '../assets/trust.svg';
import Web3 from 'web3';
import { t } from '../../i18n/utils/intl';

const RPC = {
  1: 'https://mainnet.infura.io/v3/0b500c5f885b43a4ab192e8048f6fa88',
  4: 'https://rinkeby.infura.io/v3/8f6d3d5d7a1442a38d9e8050c31c1884',
  56: 'https://bsc-dataseed4.binance.org',
};

export async function connectWallet() {
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
    'custom-imtoken': {
      display: {
        logo: imTokenLogo,
        name: t('connect-wallet.custom-imtoken.name'),
        description: t('connect-wallet.custom-imtoken.description'),
      },
      package: WalletConnectProvider,
      options: {
        rpc: RPC,
      },
      connector: async (ProviderPackage: any, options: any) => {
        const provider = new ProviderPackage(options);
        await provider.enable();
        return provider;
      },
    },
    'custom-math': {
      display: {
        logo: mathLogo,
        name: t('connect-wallet.custom-math.name'),
        description: t('connect-wallet.custom-math.description'),
      },
      package: WalletConnectProvider,
      options: {
        rpc: RPC,
      },
      connector: async (ProviderPackage: any, options: any) => {
        const provider = new ProviderPackage(options);
        await provider.enable();
        return provider;
      },
    },
    'custom-trust': {
      display: {
        logo: trustWalletLogo,
        name: t('connect-wallet.custom-trust.name'),
        description: t('connect-wallet.custom-trust.description'),
      },
      package: WalletConnectProvider,
      options: {
        rpc: RPC,
      },
      connector: async (ProviderPackage: any, options: any) => {
        const provider = new ProviderPackage(options);
        await provider.enable();
        return provider;
      },
    },
    'custom-huobi': {
      display: {
        logo: huobiLogo,
        name: t('connect-wallet.custom-huobi.name'),
        description: t('connect-wallet.custom-huobi.description'),
      },
      package: WalletConnectProvider,
      options: {
        rpc: RPC,
      },
      connector: async (ProviderPackage: any, options: any) => {
        const provider = new ProviderPackage(options);
        await provider.enable();
        return provider;
      },
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: RPC,
      },
    },
  };

  const modal = new Web3Modal({
    cacheProvider: false,
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
