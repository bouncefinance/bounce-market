import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
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
  count?: number;
  isItemType?: boolean;
  contractAddress?: string;
}

export const useLike = ({
  id,
  category,
  /**
   * likes count required for urgent counter update
   */
  count,
  contractAddress = '',
}: IUseLikeProps) => {
  const { isConnected } = useAccount();
  const dispatch = useDispatchRequest();
  const requestKey = `/${id}`;

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(count);
  const { listMap: likesMap } = useSelector<RootState, RootState['like']>(
    state => state.like,
  );

  useEffect(() => {
    const _likeInfo = likesMap?.get(id.toString());
    setIsLiked(Boolean(_likeInfo?.isLike));
    if (_likeInfo?.likeCount !== undefined) {
      setLikeCount(_likeInfo?.likeCount);
    }
    if (_likeInfo === undefined && likeCount !== count) {
      setLikeCount(count);
    }
  }, [id, likesMap, count, likeCount]);

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
        category,
        isLiked: !isLiked,
        itemId: id,
        contractAddress,
      }),
    );
    dispatch(queryLikedItems());
    if (likeData?.code === 1) {
      setIsLiked(!isLiked);
    }
  }, [
    category,
    dispatch,
    id,
    isLikeDisabled,
    isLiked,
    requestKey,
    contractAddress,
  ]);

  return {
    isLikeDisabled,
    isLiked,
    onLikeClick,
    likeCount,
  };
};
