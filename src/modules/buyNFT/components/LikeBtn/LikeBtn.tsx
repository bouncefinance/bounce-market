import { ResponseData } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import classNames from 'classnames';
import { fetchItem } from 'modules/buyNFT/actions/fetchItem';
import { HeartIcon } from 'modules/common/components/Icons/HeartIcon';
import { featuresConfig } from 'modules/common/conts';
import { AuctionType } from 'modules/overview/api/auctionType';
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
  const { poolId, poolType } = useParams<{
    poolId: string;
    poolType: AuctionType;
  }>();
  const classes = useLikeBtnStyles();
  const { data } = useQuery<ResponseData<typeof fetchItem> | null>({
    type: fetchItem.toString(),
  });
  const id = data ? data.id : -1;
  const { isLiked, isLikeDisabled, onLikeClick, likeCount } = useLike({
    id,
    count,
    poolId: +poolId,
    auctionType: poolType,
    category: data?.category || 'image',
  });

  return (
    <Button
      variant="outlined"
      className={className}
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
