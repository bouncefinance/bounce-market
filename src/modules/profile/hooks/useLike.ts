import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { PoolType } from 'modules/common/api/poolType';
import { useCallback, useState } from 'react';
import { dealAccountLike } from '../actions/dealAccountLike';
import { ILikedItem, queryLikedItems } from '../actions/queryLikedItems';

export const useIsLiked = (id: number, poolId: number) => {
  const { data } = useQuery<ILikedItem[] | null>({
    type: queryLikedItems.toString(),
  });

  const isLiked = data
    ? !!data.find(
        likedItem => likedItem.itemId === id && likedItem.poolId === poolId,
      )
    : false;

  return { isLiked };
};

interface IUseLikeProps {
  id: number;
  category: string;
  poolType?: PoolType;
  poolId: number;
  count?: number;
}

export const useLike = ({
  id,
  poolType,
  category,
  poolId,
  /**
   * likes count required for urgent counter update
   */
  count,
}: IUseLikeProps) => {
  const { isConnected } = useAccount();
  const dispatch = useDispatchRequest();
  const requestKey = `/${id}`;
  const { isLiked } = useIsLiked(id, poolId);
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

    setLikeCount(val => {
      if (typeof val !== 'number') {
        return val;
      }
      return isLiked ? val - 1 : val + 1;
    });

    dispatch(
      dealAccountLike({
        requestKey,
        poolType,
        category,
        poolId,
        isLiked: !isLiked,
        itemId: id,
      }),
    );
  }, [
    poolType,
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
    likeCount,
  };
};
