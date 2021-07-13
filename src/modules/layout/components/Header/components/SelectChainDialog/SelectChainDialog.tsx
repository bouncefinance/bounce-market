import React from 'react';
import { Dialog } from '@material-ui/core';
import { useSelectChainStyled } from './useSelectChainStyled';
import { ReactComponent as EthereumIcon } from './assets/ethereum.svg';
import { ReactComponent as BinanceIcon } from './assets/binance.svg';
import { ReactComponent as HecoIcon } from './assets/heco.svg';
import { ModalCloseBtn } from 'modules/uiKit/ModalCloseBtn';
import { useAccount } from 'modules/account/hooks/useAccount';
import { t } from 'modules/i18n/utils/intl';

export interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export const SelectChainDialog = ({
  isOpen = false,
  onClose,
}: {
  isOpen?: boolean;
  onClose: () => void;
}) => {
  const classes = useSelectChainStyled();
  const { handleChangeNetworkToSupported } = useAccount();
  const chainList = [
    {
      icon: <EthereumIcon />,
      title: t('header.select-chain.eth'),
      subTitle: '',
      chainConfig: {
        chainId: '0x1',
        chainName: 'Ethereum Chain Mainnet',
        nativeCurrency: {
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: [
          'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        ],
        blockExplorerUrls: ['https://etherscan.io/'],
      },
    },
    {
      icon: <BinanceIcon />,
      title: t('header.select-chain.bnb'),
      subTitle: '',
      chainConfig: {
        chainId: '0x38',
        chainName: 'Binance Smart Chain Mainnet',
        nativeCurrency: {
          name: 'Binance',
          symbol: 'BNB',
          decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed4.binance.org'],
        blockExplorerUrls: ['https://bscscan.com/'],
      },
    },
    {
      icon: <HecoIcon />,
      title: t('header.select-chain.heco'),
      subTitle: t('header.select-chain.heco-2'),
      chainConfig: {
        chainId: '0x80',
        chainName: 'Huobi ECO Chain Mainnet',
        nativeCurrency: {
          name: 'Heco',
          symbol: 'HT',
          decimals: 18,
        },
        rpcUrls: ['https://http-mainnet.hecochain.com'],
        blockExplorerUrls: ['https://scan.hecochain.com'],
      },
    },
  ];

  const renderCard = ({
    icon,
    title,
    subTitle,
    chainConfig,
  }: {
    icon: JSX.Element;
    title: string;
    subTitle?: string;
    chainConfig: AddEthereumChainParameter;
  }) => {
    return (
      <div
        className={classes.cardItem}
        onClick={() => {
          handleChangeNetworkToSupported(chainConfig);
        }}
      >
        {icon}
        <div className={classes.textBox}>
          <h3>
            {title} <br />
            {subTitle && <span>{subTitle}</span>}
          </h3>
        </div>
      </div>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      classes={{
        paper: classes.root,
      }}
    >
      <h1 className={classes.h1}>{t('header.select-chain.title')}</h1>
      <div className={classes.cardWrapper}>
        {chainList.map(item => {
          return renderCard(item);
        })}
      </div>

      <ModalCloseBtn onClick={onClose} />
    </Dialog>
  );
};
