import React from 'react';
import { useQuery } from '@redux-requests/react';
import classNames from 'classnames';
import { fetchItem, IFetchItem } from 'modules/buyNFT/actions/fetchItem';
import { HeartIcon } from 'modules/common/components/Icons/HeartIcon';
import { featuresConfig } from 'modules/common/conts';
import { useLike } from 'modules/profile/hooks/useLike';
import { Button } from 'modules/uiKit/Button';
import { useLikeBtnStyles } from './useLikeBtnStyles';
import { useAccount } from 'modules/account/hooks/useAccount';

interface ILikeBtnProps {
  className?: string;
  count?: number;
}

export const LikeBtn = ({ className, count = 0 }: ILikeBtnProps) => {
  const classes = useLikeBtnStyles();
  const { data } = useQuery<IFetchItem | null>({
    type: fetchItem.toString(),
  });
  const id = data ? data.id : -1;
  const { isLiked, isLikeDisabled, onLikeClick, likeCount } = useLike({
    id,
    count: data?.likeCount,
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
  className?: number;
  category?: string;
  count?: number;
  id?: number;
  isLike?: boolean;
  contractAddress: string;
};
export const NftLikeBtn = ({
  className,
  count = 0,
  category,
  id = -1,
  contractAddress,
}: nftLikeType) => {
  const classes = useLikeBtnStyles();
  const { isConnected, handleConnect } = useAccount();
  const { isLiked, isLikeDisabled, onLikeClick, likeCount } = useLike({
    id,
    count,
    category: category || 'image',
    contractAddress,
  });

  return (
    <Button
      variant="outlined"
      className={classNames(classes.root, className)}
      onClick={() => {
        if (!isConnected) {
          handleConnect();
        }
        onLikeClick();
      }}
      disabled={isLikeDisabled && isConnected}
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
