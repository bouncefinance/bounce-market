import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { AuctionType } from 'modules/api/common/auctionType';
import { PoolType } from 'modules/api/common/poolType';
import { getPoolKey } from 'modules/common/utils/poolHelps';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
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
  auctionType?: AuctionType;
  poolId: number;
  count?: number;
  isLike?: boolean;
  isItemType?: boolean;
  contractAddress?: string;
}

export const useLike = ({
  id,
  poolType,
  auctionType,
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

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(count);
  const { count: storeCount, listMap: likesMap } = useSelector<
    RootState,
    RootState['like']
  >(state => state.like);

  useEffect(() => {
    const _isLike = likesMap?.get(
      poolType
        ? getPoolKey({
            poolId,
            poolType: (auctionType as unknown) as string,
          })
        : id.toString(),
    );
    setIsLiked(Boolean(_isLike));
  }, [id, auctionType, poolId, storeCount, likesMap, poolType]);

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
    dispatch(queryLikedItems());
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
