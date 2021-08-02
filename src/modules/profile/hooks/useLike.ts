import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { PoolType } from 'modules/api/common/poolType';
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
  isLike?: boolean;
  isItemType?: boolean;
  contractAddress?: string;
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
  isLike,
  isItemType = false,
  contractAddress = '',
}: IUseLikeProps) => {
  const { isConnected } = useAccount();
  const dispatch = useDispatchRequest();
  const requestKey = `/${id}`;

  const [isLiked, setIsLiked] = useState(isLike);
  const [likeCount, setLikeCount] = useState(count);

  const { loading } = useMutation({
    type: dealAccountLike.toString(),
    requestKey,
  });

  const isLikeDisabled = loading || !isConnected;

  const onLikeClick = useCallback(async () => {
    if (isLikeDisabled) {
      return;
    }

    setLikeCount(val => {
      if (typeof val !== 'number') {
        return val;
      }
      return isLiked ? val - 1 : val + 1;
    });

    const { data: likeData } = await dispatch(
      dealAccountLike({
        requestKey,
        poolType,
        category,
        poolId,
        isLiked: !isLiked,
        itemId: id,
        isItemType,
        contractAddress,
      }),
    );
    if (likeData?.code === 1) {
      setIsLiked(!isLiked);
    }
  }, [
    poolType,
    category,
    dispatch,
    id,
    isLikeDisabled,
    isLiked,
    poolId,
    requestKey,
    isItemType,
    contractAddress,
  ]);

  return {
    isLikeDisabled,
    isLiked,
    onLikeClick,
    likeCount,
  };
};
