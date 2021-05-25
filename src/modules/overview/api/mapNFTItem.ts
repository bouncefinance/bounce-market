import BigNumber from 'bignumber.js';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import Web3 from 'web3';
import { NFTCategoryType } from '../actions/fetchItemsByFilter';
import { INFTItem } from '../actions/fetchNFTItems';

export const mapNFTItem = (item: INFTItem) => ({
  id: item.id,
  poolId: item.poolId,
  poolType: item.poolType,
  href:
    item.poolId && item.poolType
      ? BuyNFTRoutesConfig.DetailsNFT.generatePath(item.poolId, item.poolType)
      : '',
  price: new BigNumber(Web3.utils.fromWei(item.price)),
  title: item.itemname || '',
  priceType: 'BNB',
  likes: item.likecount,
  // TODO: get NFT item copies data
  copies: undefined,
  // TODO: get NFT item end date data
  endDate: undefined,
  ProfileInfoProps: {
    subTitle: 'Owner',
    title: '1livinginzen',
    users: [
      {
        name: 'name',
        avatar: 'https://via.placeholder.com/32',
      },
    ],
  },
  category: item.category || NFTCategoryType.image,
  src: item.fileurl,
});
