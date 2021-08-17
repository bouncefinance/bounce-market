export const getRoyaltySignContract = (chainID: any) => {
  switch (chainID) {
    case 1:
      return process.env.REACT_APP_ROYALTY_CONFIG_ETH_MAINNET as string;
    case 4:
      return process.env.REACT_APP_ROYALTY_CONFIG_RINKEBY as string;
    case 56:
      return process.env.REACT_APP_ROYALTY_CONFIG_BSC as string;
    case 128:
      return process.env.REACT_APP_ROYALTY_CONFIG_HECO as string;
    case 137:
      return process.env.REACT_APP_ROYALTY_CONFIG_MATIC as string;
    default:
      return '';
  }
};
