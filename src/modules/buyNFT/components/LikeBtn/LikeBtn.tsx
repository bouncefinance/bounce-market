import { useQuery } from '@redux-requests/react';
import classNames from 'classnames';
import { fetchItem } from 'modules/buyNFT/actions/fetchItem';
import { INFTDetails } from 'modules/buyNFT/api/NFTDetails';
import { poolTypeMap } from 'modules/common/api/poolType';
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
  const { poolId, auctionType } = useParams<{
    poolId: string;
    auctionType: AuctionType;
  }>();
  const classes = useLikeBtnStyles();
  const { data } = useQuery<INFTDetails | null>({
    type: fetchItem.toString(),
  });
  const id = data ? data.id : -1;
  const { isLiked, isLikeDisabled, onLikeClick, likeCount } = useLike({
    id,
    count,
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
