import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { AuctionType } from 'modules/overview/api/auctionType';
import { useCallback, useState } from 'react';
import { dealAccountLike } from '../actions/dealAccountLike';
import { getAccountLikes, ILikedItem } from '../actions/getAccountLikes';

/**
 * It useful when you need to check is NFT item already liked by user
 *
 * @param  id  NFT item ID
 * @return  `true` if NFT is already liked
 */
export const useIsLiked = (id: number) => {
  const { data } = useQuery<ILikedItem[] | null>({
    type: getAccountLikes.toString(),
  });

  const isLiked = data
    ? !!data.find(likedItem => likedItem.itemid === id)
    : false;

  return { isLiked };
};

interface IUseLikeProps {
  id: number;
  category: string;
  auctionType?: AuctionType;
  poolId?: number;
  count?: number;
}

export const useLike = ({
  id,
  auctionType,
  category,
  poolId,
  /**
   * required for urgent counter update
   */
  count = 0,
}: IUseLikeProps) => {
  const { isConnected } = useAccount();
  const dispatch = useDispatchRequest();
  const requestKey = `/${id}`;
  const { isLiked } = useIsLiked(id);
  const [likeCount, setLikeCount] = useState(count);

  const { loading } = useMutation({
    type: dealAccountLike.toString(),
    requestKey,
  });

  const isLikeDisabled = loading || !isConnected;

  const onLikeClick = useCallback(() => {
    if (isLikeDisabled) {
      return;
    }

    setLikeCount(val => (isLiked ? (val === 0 ? val : val - 1) : val + 1));

    dispatch(
      dealAccountLike({
        requestKey,
        auctionType,
        category,
        poolId,
        isLiked: !isLiked,
        itemId: id,
      }),
    );
  }, [
    auctionType,
    category,
    dispatch,
    id,
    isLikeDisabled,
    isLiked,
    poolId,
    requestKey,
  ]);

  return {
    isLikeDisabled,
    isLiked,
    onLikeClick,
    likeCount: likeCount === 0 && isLiked ? 1 : likeCount,
  };
};
