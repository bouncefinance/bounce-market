import BigNumber from 'bignumber.js';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import Web3 from 'web3';
import { INFTItem } from '../actions/fetchNFTItems';
import { t } from 'modules/i18n/utils/intl';

export const mapProductCardData = (item: INFTItem) => ({
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
    subTitle: t('product-card.owner'),
    title: `${item.owneraddress ?? ''}`,
    users: [
      {
        name: 'name',
        avatar: 'https://via.placeholder.com/32',
      },
    ],
  },
  ownerAddress: item.owneraddress,
  category: item.category || 'image',
  src: item.fileurl,
  ownerAvatar: item.ownerAvatar,
  ownerName: item.ownerName,
});
