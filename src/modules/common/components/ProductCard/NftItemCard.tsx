import { INftItem } from 'modules/api/common/itemType';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { TokenSymbol } from 'modules/common/types/TokenSymbol';
import { RoutesConfiguration } from 'modules/createNFT/Routes';
import { CardProfileInfo } from '../ProfileInfo';
import { ProductCard } from './ProductCard';

export const NftItemCard = ({
  item,
  tokenSymbol = TokenSymbol.BNB,
  isOther = false,
}: {
  item: INftItem;
  tokenSymbol: string;
  isOther?: boolean;
}) => {
  return (
    <ProductCard
      id={item.tokenId}
      poolId={0}
      isItemType
      title={item.name}
      href={BuyNFTRoutesConfig.Details_ITEM_NFT.generatePath(
        item.tokenId,
        item.contractAddress,
      )}
      contractAddress={item.contractAddress}
      likes={item.likeCount}
      isLike={item.isLike}
      priceType={tokenSymbol}
      copies={item?.supply ?? 0}
      copiesBalance={item?.balance ?? 0}
      MediaProps={{
        category: item.category,
        src: item.fileUrl || 'xxx',
        objectFit: 'contain',
        loading: 'lazy',
      }}
      toSale={
        isOther
          ? undefined
          : RoutesConfiguration.PublishNft.generatePath(
              item.contractAddress,
              item.tokenId,
            )
      }
      profileInfo={
        <CardProfileInfo
          subTitle="Creator"
          title={item.name}
          users={item.avatars}
        />
      }
    />
  );
};
