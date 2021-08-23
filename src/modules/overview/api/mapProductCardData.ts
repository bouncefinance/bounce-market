import BigNumber from 'bignumber.js';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import Web3 from 'web3';
import { INFTItem } from '../actions/fetchNFTItems';

export const mapProductCardData = (item: INFTItem) => ({
  id: item.id,
  poolId: item.poolId,
  poolType: item.poolType,
  href:
    item.poolId !== undefined && item.poolType
      ? BuyNFTRoutesConfig.DetailsNFT.generatePath(item.poolId, item.poolType)
      : '',
  price: new BigNumber(Web3.utils.fromWei(item.price)),
  title: item.itemname || '',
  priceType: item.tokenSymbol,
  likes: item.likecount,
  // TODO: get NFT item copies data
  copies: undefined,
  // TODO: get NFT item end date data
  endDate: item.endDate,
  ownerAddress: item.owneraddress,
  category: item.category || 'image',
  src: item.fileurl,
  ownerAvatar: item.ownerAvatar,
  ownerName: item.ownerName,
  identity: item.identity,
  openAt: item.openAt,
  isLike: item.isLike,
  soldAmount: item.soldAmount,
  supplyAmount: item.supplyAmount,
  nftCardOption: item.nftCardOption,
});
