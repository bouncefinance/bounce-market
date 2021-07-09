import classNames from 'classnames';
import { useAccount } from 'modules/account/hooks/useAccount';
import {
  BlockchainNetworkId,
  getBlockChainExplorerAddress,
  getBlockChainExplorerName,
} from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import React from 'react';
import { BscScanIcon } from './assets/BscScanIcon';
import { ETHScanIcon } from './assets/ETHScanIcon';
import { HTScanIcon } from './assets/HTScanIcon';
import { useBSCScanBtnStyles } from './useBSCScanBtnStyles';

interface IBSCScanBtnProps {
  className?: string;
  contractAddress: string;
}

export const ScanBtn = ({ className, contractAddress }: IBSCScanBtnProps) => {
  const classes = useBSCScanBtnStyles();

  const { chainId } = useAccount();
  const blockChainScan = getBlockChainExplorerAddress(chainId);
  const blockChaninName = getBlockChainExplorerName(chainId);

  return (
    <Button
      className={classNames(classes.root, className)}
      component="a"
      target="_blank"
      href={`${blockChainScan}address/${contractAddress}`}
      variant="outlined"
      fullWidth
    >
      {chainId === BlockchainNetworkId.smartchain && (
        <BscScanIcon className={classes.icon} />
      )}
      {(chainId === BlockchainNetworkId.mainnet ||
        chainId === BlockchainNetworkId.rinkeby) && (
        <ETHScanIcon className={classes.icon} />
      )}
      {chainId === BlockchainNetworkId.heco && (
        <HTScanIcon className={classes.icon} />
      )}
      {t('details-nft.info.view-scan', { name: blockChaninName })}
    </Button>
  );
};
