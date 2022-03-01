import { getMetaData, IMetadataInfo } from 'modules/api/common/getMetadata';
import { INftItem } from 'modules/api/common/itemType';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { TokenSymbol } from 'modules/common/types/TokenSymbol';
import { RoutesConfiguration } from 'modules/createNFT/Routes';
import { useEffect, useState } from 'react';
import { CardProfileInfo } from '../ProfileInfo';
import { ProductCard } from './ProductCard';

export const NftItemCard = ({
  item,
  tokenSymbol = TokenSymbol.BNB,
  isOther = false,
  isTotalSupply,
  hasAction,
  reload,
}: {
  item: INftItem;
  tokenSymbol: string;
  isOther?: boolean;
  isTotalSupply?: boolean;
  hasAction?: boolean;
  reload?: () => void;
}) => {
  const [metadata, setMetadata] = useState<IMetadataInfo>();
  const init = async () => {
    try {
      const res = await getMetaData(item.itemId);
      setMetadata(res);
    } catch (error) {}
  };
  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, [item.itemId]);
  return (
    <ProductCard
      reload={reload}
      standard={item.standard}
      hasAction={hasAction}
      id={item.tokenId}
      poolId={0}
      isItemType
      title={metadata?.name || item.name}
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
        src: metadata?.image || item.litimgurl || item.fileUrl || 'xxx',
        objectFit: 'contain',
        loading: 'lazy',
        original: Boolean(metadata?.image),
      }}
      toSale={
        isOther
          ? undefined
          : RoutesConfiguration.PublishNft.generatePath(
              item.contractAddress,
              item.tokenId,
            )
      }
      isOther={isOther}
      isTotalSupply={isTotalSupply}
      profileInfo={
        <CardProfileInfo
          subTitle="Creator"
          title={metadata?.name || item.name}
          users={item.avatars}
        />
      }
      apetype={item.apetype}
    />
  );
};
