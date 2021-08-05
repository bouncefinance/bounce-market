// TODO
export const getMultiCallAddress = (chainID: number) => {
  switch (chainID) {
    case 1:
      return '';
    case 4:
      return '';
    case 56:
      return process.env.REACT_APP_MULTI_CALL_BSC;
    case 128:
      return '';
    case 137:
      return '';
    default:
      return '';
  }
};
