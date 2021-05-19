import BigNumber from 'bignumber.js';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import Web3 from 'web3';
import { NFTCategoryType } from '../actions/fetchItemsByFilter';
import { INFTItem } from '../actions/fetchNFTItems';
import { AuctionType } from './auctionType';

export const mapNFTItem = (item: INFTItem) => ({
  href:
    item.poolId && item.poolType
      ? BuyNFTRoutesConfig.DetailsNFT.generatePath(item.poolId, item.poolType)
      : '',
  price: new BigNumber(Web3.utils.fromWei(item.price)),
  title: item.itemname || '',
  priceType: 'BNB',
  likes: item.likecount,
  copies: item.poolType === AuctionType.FixedSwap ? 3 : undefined,
  endDate:
    item.poolType === AuctionType.EnglishAuction ? new Date() : undefined,
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
