import BigNumber from 'bignumber.js';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { NFTCategoryType } from '../actions/fetchItemsByFilter';
import { INFTItem } from '../actions/fetchNFTItems';
import { ProductProps } from '../components/Movers';
import { AuctionType } from './auctionType';

export const mapNFTItems = (items: INFTItem[]): ProductProps[] =>
  items.map(nftItem => ({
    href:
      nftItem.poolId && nftItem.poolType
        ? BuyNFTRoutesConfig.DetailsNFT.generatePath(
            nftItem.poolId,
            nftItem.poolType,
          )
        : '',
    price: new BigNumber(nftItem.price),
    title: nftItem.itemname || '',
    priceType: 'BNB',
    likes: nftItem.likecount,
    copies: nftItem.poolType === AuctionType.FixedSwap ? 3 : undefined,
    endDate:
      nftItem.poolType === AuctionType.EnglishAuction ? new Date() : undefined,
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
    ...(nftItem.category === NFTCategoryType.image
      ? {
          img: nftItem.fileurl || '',
        }
      : {
          video: nftItem.fileurl || '',
        }),
  }));
