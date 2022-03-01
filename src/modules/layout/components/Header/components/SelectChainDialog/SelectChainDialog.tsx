import React, { ReactNode } from 'react';
import { Dialog } from '@material-ui/core';
import { useSelectChainStyled } from './useSelectChainStyled';
// import { ReactComponent as PolygonIcon } from './assets/polygon.svg';
import { ModalCloseBtn } from 'modules/uiKit/ModalCloseBtn';
import { useAccount } from 'modules/account/hooks/useAccount';
import { t } from 'modules/i18n/utils/intl';
import { ChainType, getChainConfig } from 'modules/account/hooks/chainConfig';

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
  const chainList: ChainType[] = [1, 56, 128, 1111];

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
      if (chainConfig.chainId === '0x1bf52') {
        window.location.href = 'https://solana.fangible.com/index';
      }
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
        {chainList.map(item => renderCard(getChainConfig(item)))}
      </div>

      <ModalCloseBtn onClick={onClose} />
    </Dialog>
  );
};
