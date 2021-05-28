export const FetchBrandsAction = 'BrandActions/fetchBrands';
export const ListBrandsAction = 'BrandActions/listBrands';
export const ListBrandItemsAction = 'BrandActions/listBrandItems';
export const QueryBrandByFilterAction = 'BrandActions/QueryBrandByFilter';
export const QueryBrandByIdAction = 'BrandActions/QueryBrandById';
export const QueryBrandPoolsAction = 'BrandActions/QueryBrandPoolsAction';
export const QueryBrandItems721Action = 'BrandActions/QueryBrandItems721Action';
export const QueryBrandItems1155Action =
  'BrandActions/QueryBrandItems1155Action';
export const QueryBrandItemsAction = 'BrandActions/QueryBrandItemsAction';
export const FetchBrandListAction = 'BrandActions/fetchBrandList';
export const FetchPopularBrandsAction = 'BrandActions/fetchPopularBrands';
export const CreateBrandAction = 'BrandActions/createBrand';
export const UpdateBrandInfoAction = 'BrandActions/updateBrandInfo';
export const QueryBrandAddressAction = 'BrandActions/queryBrandAddress';
export const GetAccountBrandAction = 'BrandActions/getAccountBrand';
export const EditBrandImgAction = 'BrandActions/editBrandImg';

const FACTORY_CONTRACT_ADDRESS = {
  RINKEBY: '0xb9BaC7b8C8ca157035E78e764bC3AD7D7BcCAb3A',
  HOBI: '0x41939809dB201c8531D082f95Fc5BEc187Fe2803',
  BNB_MAINNET_TEST_ENV: process.env.REACT_APP_BRAND_CONTRACT_ADDRESS_V2,
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
