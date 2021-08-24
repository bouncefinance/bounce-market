import { makeStyles } from '@material-ui/core/styles';
import { BscScanIcon } from 'modules/buyNFT/components/ScanBtn/assets/BscScanIcon';
import { ETHScanIcon } from 'modules/buyNFT/components/ScanBtn/assets/ETHScanIcon';
import { HTScanIcon } from 'modules/buyNFT/components/ScanBtn/assets/HTScanIcon';
import { MaticScanIcon } from 'modules/buyNFT/components/ScanBtn/assets/MaticScanIcon';
import { BlockchainNetworkId } from 'modules/common/conts';
import { getChainId } from 'modules/common/utils/localStorage';

const useStyles = makeStyles({
  root: {},
});

export const ChainsIcon: React.FC<{
  chiaId?: number;
  className?: string;
}> = ({ chiaId: propsChiaId, className }) => {
  const styles = useStyles();

  const chiaId = propsChiaId || getChainId();
  const chainsIcon = {
    [BlockchainNetworkId.mainnet]: ETHScanIcon,
    [BlockchainNetworkId.ropsten]: ETHScanIcon,
    [BlockchainNetworkId.rinkeby]: ETHScanIcon,
    [BlockchainNetworkId.goerli]: ETHScanIcon,
    [BlockchainNetworkId.dev]: ETHScanIcon,
    [BlockchainNetworkId.classic]: ETHScanIcon,
    [BlockchainNetworkId.mordor]: ETHScanIcon,
    [BlockchainNetworkId.kotti]: ETHScanIcon,
    [BlockchainNetworkId.smartchain]: BscScanIcon,
    [BlockchainNetworkId.smartchainTestnet]: BscScanIcon,
    [BlockchainNetworkId.heco]: HTScanIcon,
    [BlockchainNetworkId.matic]: MaticScanIcon,
  };
  const Render = chainsIcon[chiaId as BlockchainNetworkId];
  return Render ? (
    <Render className={className ?? styles.root}></Render>
  ) : (
    <span>--</span>
  );
};
