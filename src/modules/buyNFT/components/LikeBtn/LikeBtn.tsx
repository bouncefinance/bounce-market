import { useQuery } from '@redux-requests/react';
import classNames from 'classnames';
import { AuctionType } from 'modules/api/common/auctionType';
import { PoolType, poolTypeMap } from 'modules/api/common/poolType';
import { fetchItem, IFetchItem } from 'modules/buyNFT/actions/fetchItem';
import { HeartIcon } from 'modules/common/components/Icons/HeartIcon';
import { featuresConfig } from 'modules/common/conts';
import { useLike } from 'modules/profile/hooks/useLike';
import { Button } from 'modules/uiKit/Button';
import React from 'react';
import { useParams } from 'react-router';
import { useLikeBtnStyles } from './useLikeBtnStyles';

interface ILikeBtnProps {
  className?: string;
  count?: number;
}

export const LikeBtn = ({ className, count = 0 }: ILikeBtnProps) => {
  const { poolId, auctionType } = useParams<{
    poolId: string;
    auctionType: AuctionType;
  }>();
  const classes = useLikeBtnStyles();
  const { data } = useQuery<IFetchItem | null>({
    type: fetchItem.toString(),
  });
  const id = data ? data.id : -1;
  const { isLiked, isLikeDisabled, onLikeClick, likeCount } = useLike({
    id,
    count: data?.likeCount,
    poolType: +poolTypeMap[auctionType],
    poolId: +poolId,
    category: data?.category || 'image',
  });

  return (
    <Button
      variant="outlined"
      className={classNames(classes.root, className)}
      onClick={onLikeClick}
      disabled={isLikeDisabled}
      rounded
    >
      <HeartIcon
        className={classNames(
          classes.btnIcon,
          isLiked && classes.btnIconActive,
        )}
      />

      {featuresConfig.nftDetailsLikesCount && (
        <span className={classes.btnText}>{likeCount}</span>
      )}
    </Button>
  );
};

type nftLikeType = {
  isItemType?: boolean;
  className?: number;
  poolId?: number;
  category?: string;
  count?: number;
  id?: number;
  poolType?: PoolType;
  isLike?: boolean;
};
export const NftLikeBtn = ({
  className,
  count = 0,
  category,
  poolId = -1,
  isItemType = false,
  id = -1,
  poolType = PoolType.Unknown,
  isLike = false,
}: nftLikeType) => {
  const classes = useLikeBtnStyles();
  const { isLiked, isLikeDisabled, onLikeClick, likeCount } = useLike({
    id,
    count,
    poolType,
    poolId: poolId,
    category: category || 'image',
    isItemType,
    isLike,
  });

  return (
    <Button
      variant="outlined"
      className={classNames(classes.root, className)}
      onClick={onLikeClick}
      disabled={isLikeDisabled}
      rounded
    >
      <HeartIcon
        className={classNames(
          classes.btnIcon,
          isLiked && classes.btnIconActive,
        )}
      />

      {featuresConfig.nftDetailsLikesCount && (
        <span className={classes.btnText}>{likeCount}</span>
      )}
    </Button>
  );
};
