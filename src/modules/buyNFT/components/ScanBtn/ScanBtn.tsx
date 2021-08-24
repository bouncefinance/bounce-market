import classNames from 'classnames';
import { useAccount } from 'modules/account/hooks/useAccount';
import { ChainsIcon } from 'modules/common/components/Icons/Chains';
import {
  getBlockChainExplorerAddress,
  getBlockChainExplorerName,
} from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
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
      <ChainsIcon chiaId={chainId} className={classes.icon} />
      {t('details-nft.info.view-scan', { name: blockChaninName })}
    </Button>
  );
};
