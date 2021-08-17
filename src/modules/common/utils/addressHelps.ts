// TODO
export const getMultiCallAddress = (chainID: number) => {
  switch (chainID) {
    case 1:
      return process.env.REACT_APP_MULTI_CALL_ETH_MAINNET;
    case 4:
      return process.env.REACT_APP_MULTI_CALL_ETH_RINKEBY;
    case 56:
      return process.env.REACT_APP_MULTI_CALL_BSC;
    case 128:
      return process.env.REACT_APP_MULTI_CALL_HECO;
    case 137:
      return '';
    default:
      return '';
  }
};
