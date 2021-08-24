import { AuctionState } from 'modules/api/common/AuctionState';
import { FixedSwapState } from 'modules/api/common/FixedSwapState';
import { IPoolNftItem } from 'modules/api/common/poolType';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { ProductCard } from 'modules/common/components/ProductCard';
import { CardProfileInfo } from 'modules/common/components/ProfileInfo';
import { isFixedSwap } from 'modules/common/utils/poolHelps';
import { t } from 'modules/i18n/utils/intl';

export const MarketNftCard = ({
  item,
  tokenSymbol,
}: {
  item: IPoolNftItem;
  tokenSymbol: string;
}) => {
  return (
    <ProductCard
      isOnSale
      id={item.tokenId ?? -1}
      poolId={item.poolId ?? -1}
      auctionType={item.poolType}
      title={item.itemName}
      price={item.price}
      priceType={tokenSymbol}
      endDate={item.closeAt}
      soldData={{
        sold: item.swapped_amount0,
        quantity: item.token_amount0,
      }}
      contractAddress={item.token0}
      likes={item.likeCount}
      href={
        item.poolId !== undefined && item.poolType
          ? BuyNFTRoutesConfig.DetailsNFT.generatePath(
              item.poolId,
              item.poolType,
            )
          : ''
      }
      MediaProps={{
        category: item.category,
        src: item.fileUrl,
        objectFit: 'contain',
        loading: 'lazy',
      }}
      state={
        isFixedSwap(item.poolType) ? FixedSwapState.Live : AuctionState.Live
      }
      profileInfo={
        <CardProfileInfo
          subTitle={t('product-card.owner')}
          title={item.itemName || ''}
          users={item.avatars}
          nftCardOption={{
            ...item.nftCardOption,
            isOnSale: true,
          }}
        />
      }
      openAt={item.openAt}
    />
  );
};
