import loadable from '@loadable/component';
import { Box, BoxProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BscScanIcon } from 'modules/buyNFT/components/ScanBtn/assets/BscScanIcon';
import { ETHScanIcon } from 'modules/buyNFT/components/ScanBtn/assets/ETHScanIcon';
import { HTScanIcon } from 'modules/buyNFT/components/ScanBtn/assets/HTScanIcon';
import { MaticScanIcon } from 'modules/buyNFT/components/ScanBtn/assets/MaticScanIcon';
import {
  BlockchainNetworkId,
  DefaultChainId,
  getChainSymbol,
} from 'modules/common/conts';
import { getChainId } from 'modules/common/utils/localStorage';
import React, { useMemo } from 'react';

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

interface props extends BoxProps {
  chiaId?: number;
  className?: string;
  children?: (props: { symbolName: string }) => React.ReactNode;
}

export const ChainSymbolIcon: React.FC<props> = ({
  chiaId: propsChiaId,
  className,
  children,
  ...restProps
}) => {
  const chiaId = propsChiaId || getChainId();
  const symbolName = useMemo(() => {
    return (
      getChainSymbol(chiaId as BlockchainNetworkId)?.chainSymbolName ??
      getChainSymbol(DefaultChainId).chainSymbolName
    );
  }, [chiaId]);

  const LoadableContainer = loadable(
    async () =>
      import(`./chain/${symbolName}`).then(e => e[symbolName + 'Icon']),
    {
      fallback: <></>,
    },
  );

  return (
    <Box className={className} {...restProps}>
      <LoadableContainer />
      {symbolName && children?.({ symbolName })}
    </Box>
  );
};
