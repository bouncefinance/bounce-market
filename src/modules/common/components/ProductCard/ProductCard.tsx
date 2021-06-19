import { poolTypeMap } from 'modules/common/api/poolType';
import { AuctionType } from 'modules/overview/api/auctionType';
import { useLike } from 'modules/profile/hooks/useLike';
import React, { useCallback } from 'react';
import {
  IProductCardComponentProps,
  ProductCardComponent,
} from './ProductCardComponent';

export interface IProductCardProps
  extends Omit<IProductCardComponentProps, 'isLiked'> {
  id: number;
  poolId: number;
  auctionType?: AuctionType;
  state?: number;
}

export const ProductCard = ({
  id,
  poolId,
  auctionType,
  MediaProps,
  onLikeClick,
  likes,
  state,
  ...restProps
}: IProductCardProps) => {
  const {
    isLiked,
    isLikeDisabled,
    onLikeClick: likeClickHandler,
    likeCount,
  } = useLike({
    id,
    poolId,
    poolType: auctionType ? +poolTypeMap[auctionType] : undefined,
    category: MediaProps.category,
    count: likes,
  });

  const handleLikeClick = useCallback(() => {
    if (typeof onLikeClick === 'function') {
      onLikeClick();
    }

    likeClickHandler();
  }, [likeClickHandler, onLikeClick]);

  return (
    <ProductCardComponent
      isLiked={isLiked}
      isLikeDisabled={isLikeDisabled}
      onLikeClick={handleLikeClick}
      MediaProps={MediaProps}
      likes={likeCount}
      auctionType={auctionType}
      state={state}
      {...restProps}
    />
  );
};
