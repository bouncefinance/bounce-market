export const ListBrandsAction = 'BrandActions/listBrands';
export const QueryBrandByFilterAction = 'BrandActions/QueryBrandByFilter';
export const QueryBrandByIdAction = 'BrandActions/QueryBrandById';
export const QueryBrandPoolsAction = 'BrandActions/QueryBrandPoolsAction';
export const QueryBrandItems721Action = 'BrandActions/QueryBrandItems721Action';
export const QueryBrandItems1155Action =
  'BrandActions/QueryBrandItems1155Action';
export const QueryBrandItemsAction = 'BrandActions/QueryBrandItemsAction';
export const FetchBrandListAction = 'BrandActions/fetchBrandList';
export const FetchPopularBrandsAction = 'BrandActions/fetchPopularBrands';
export const UpdateBrandInfoAction = 'BrandActions/updateBrandInfo';
export const QueryBrandAddressAction = 'BrandActions/queryBrandAddress';
export const GetAccountBrandAction = 'BrandActions/getAccountBrand';
export const EditBrandImgAction = 'BrandActions/editBrandImg';

export const getBrandContract = (chainID: number) => {
  switch (chainID) {
    case 1:
      return process.env.REACT_APP_BRAND_CONTRACT_ADDRESS_V2_ETH_MAINNET;
    case 4:
      return process.env.REACT_APP_BRAND_CONTRACT_ADDRESS_V2_RINKEBY;
    case 56:
      return process.env.REACT_APP_BRAND_CONTRACT_ADDRESS_V2;
    case 128:
      return process.env.REACT_APP_BRAND_CONTRACT_ADDRESS_V2_HECO;
    case 137:
      return process.env.REACT_APP_BRAND_CONTRACT_ADDRESS_V2_MATIC;
    default:
      return '0xb9BaC7b8C8ca157035E78e764bC3AD7D7BcCAb3A';
  }
};
