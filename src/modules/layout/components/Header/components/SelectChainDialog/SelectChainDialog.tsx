import React, { ReactNode } from 'react';
import { Dialog } from '@material-ui/core';
import { useSelectChainStyled } from './useSelectChainStyled';
import { ReactComponent as EthereumIcon } from './assets/ethereum.svg';
import { ReactComponent as BinanceIcon } from './assets/binance.svg';
// import { ReactComponent as HecoIcon } from './assets/heco.svg';
// import { ReactComponent as PolygonIcon } from './assets/polygon.svg';
import { ModalCloseBtn } from 'modules/uiKit/ModalCloseBtn';
import { useAccount } from 'modules/account/hooks/useAccount';
import { t } from 'modules/i18n/utils/intl';
import {
  BlockchainNetworkId,
  getBlockChainExplorerAddress,
} from 'modules/common/conts';
import { TokenSymbol } from 'modules/common/types/TokenSymbol';

export interface IAddEthereumChain {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: String[];
  iconUrls?: string[]; // Currently ignored.
}

export const SelectChainDialog = ({
  isOpen = false,
  onClose,
  currentChain,
}: {
  isOpen?: boolean;
  onClose: () => void;
  currentChain: number;
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
          symbol: TokenSymbol.ETH,
          decimals: 18,
        },
        rpcUrls: [
          'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        ],
        blockExplorerUrls: [
          getBlockChainExplorerAddress(BlockchainNetworkId.mainnet),
        ],
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
          symbol: TokenSymbol.BNB,
          decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed4.binance.org'],
        blockExplorerUrls: [
          getBlockChainExplorerAddress(BlockchainNetworkId.smartchain),
        ],
      },
    },
    // {
    //   icon: <HecoIcon />,
    //   title: t('header.select-chain.heco'),
    //   subTitle: t('header.select-chain.heco-2'),
    //   chainConfig: {
    //     chainId: '0x80',
    //     chainName: 'Huobi ECO Chain Mainnet',
    //     nativeCurrency: {
    //       name: 'Heco',
    //       symbol: TokenSymbol.HT,
    //       decimals: 18,
    //     },
    //     rpcUrls: ['https://http-mainnet.hecochain.com'],
    //     blockExplorerUrls: [
    //       getBlockChainExplorerAddress(BlockchainNetworkId.heco),
    //     ],
    //   },
    // },
    // {
    //   icon: <PolygonIcon />,
    //   title: t('header.select-chain.polygon'),
    //   chainConfig: {
    //     chainId: '0x89',
    //     chainName: 'Polygon Mainnet',
    //     nativeCurrency: {
    //       name: 'polygon',
    //       symbol: TokenSymbol.MATIC,
    //       decimals: 18,
    //     },
    //     rpcUrls: ['https://polygonscan.com'],
    //     blockExplorerUrls: [
    //       getBlockChainExplorerAddress(BlockchainNetworkId.matic),
    //     ],
    //   },
    // },
  ];

  const renderCard = ({
    icon,
    title,
    subTitle,
    chainConfig,
  }: {
    icon: ReactNode;
    title: string;
    subTitle?: string;
    chainConfig: IAddEthereumChain;
  }) => {
    const handleClickSwitchChain = () => {
      if (Number(chainConfig.chainId) === currentChain) return;
      handleChangeNetworkToSupported(chainConfig);
    };

    return (
      <div
        key={title}
        className={classes.cardItem}
        onClick={handleClickSwitchChain}
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
        {chainList.map(item => renderCard(item))}
      </div>

      <ModalCloseBtn onClick={onClose} />
    </Dialog>
  );
};
