export const CreateBrandAction = 'BrandActions/createBrand';
export const UpdateBrandInfoAction = 'BrandActions/updateBrandInfo';
export const QueryBrandAddressAction = 'BrandActions/queryBrandAddress';

const FACTORY_CONTRACT_ADDRESS = {
  RINKEBY: '0xb9BaC7b8C8ca157035E78e764bC3AD7D7BcCAb3A',
  HOBI: '0x41939809dB201c8531D082f95Fc5BEc187Fe2803',
  BNB_MAINNET_TEST_ENV: '0xf3af2a1b601c84033F1dEcc4aFE37E586A49f990',
  BNB_MAINNET_PRODUCTION_ENV: '0xd0DAb597286e248fE5c30494a2D2ea138652890c',
};

export const getBrandContract = (chainID: number) => {
  switch (chainID) {
    case 1:
      return '';
    case 4:
      return FACTORY_CONTRACT_ADDRESS.RINKEBY;
    case 128:
      return FACTORY_CONTRACT_ADDRESS.HOBI;
    case 56:
      return FACTORY_CONTRACT_ADDRESS.BNB_MAINNET_TEST_ENV;

    default:
      return FACTORY_CONTRACT_ADDRESS.BNB_MAINNET_TEST_ENV;
  }
};
