export const getBounceERC721WithSign = (chainID: any) => {
  switch (chainID) {
    case 1:
      return '';
    case 4:
      return '0xD9b73E3f331420C8bCBa26c98Fb7fbbCd2A682E7';
    case 56:
      return process.env.REACT_APP_ERC721_WITH_SIGN as string;

    default:
      return '0xD9b73E3f331420C8bCBa26c98Fb7fbbCd2A682E7';
  }
};

export const getBounceERC1155WithSign = (chainID: any) => {
  switch (chainID) {
    case 1:
      return '';
    case 4:
      return '0x57174694E5E1221709992B93C71d43eba7F5d73F';
    case 56:
      return process.env.REACT_APP_ERC1155_WITH_SIGN as string;

    default:
      return '0x57174694E5E1221709992B93C71d43eba7F5d73F';
  }
};
