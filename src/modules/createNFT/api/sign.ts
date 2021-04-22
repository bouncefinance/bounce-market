const disableStageEnv = true;

export const getBounceERC721WithSign = (chainID: any) => {
  const hostname = window.location.hostname;
  switch (chainID) {
    case 1:
      return '';
    case 4:
      return '0xD9b73E3f331420C8bCBa26c98Fb7fbbCd2A682E7';
    case 56:
      if (
        (hostname.indexOf('market.bounce.finance') !== -1 ||
          hostname.includes('127.0.0.1')) &&
        !disableStageEnv
      ) {
        return '0xbf4f70215e8f99e384afdf641e55181155714163';
      }
      return '0x479FCe86f116665b8a4d07165a0eB7799A4AEb30';

    default:
      return '0xD9b73E3f331420C8bCBa26c98Fb7fbbCd2A682E7';
  }
};

export const getBounceERC1155WithSign = (chainID: any) => {
  const hostname = window.location.hostname;
  switch (chainID) {
    case 1:
      return '';
    case 4:
      return '0x57174694E5E1221709992B93C71d43eba7F5d73F';
    case 56:
      if (
        hostname.indexOf('market.bounce.finance') !== -1 ||
        hostname.includes('127.0.0.1')
      ) {
        return '0x9f24433c60b51d2271c064028faab5da47cc714e';
      }
      return '0xaAAeAe4283635358946E653883cD12E5c06cC5E3';

    default:
      return '0x57174694E5E1221709992B93C71d43eba7F5d73F';
  }
};
