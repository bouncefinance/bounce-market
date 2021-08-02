import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';

import { resetRequests } from '@redux-requests/core';
import { useAccount } from 'modules/account/hooks/useAccount';
import {
  fetchFollowInfo,
  IFollowInfo,
} from 'modules/profile/actions/fetchFollowInfo';
import {
  toggleFollow,
  TollgeFollowType,
} from 'modules/profile/actions/toggleFollow';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useIsFollowd = ({ followAddress }: { followAddress: string }) => {
  const { address: accountAddress } = useAccount();
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  useEffect(() => {
    if (accountAddress) {
      dispatchRequest(
        fetchFollowInfo({
          accountAddress: accountAddress,
          followAddress: followAddress,
        }),
      );
    }

    return function reset() {
      dispatch(
        resetRequests([
          {
            requestType: fetchFollowInfo.toString(),
            requestKey: '/fetchFollowInfo',
          },
        ]),
      );
    };
  }, [followAddress, dispatch, dispatchRequest, accountAddress]);

  const { data } = useQuery<IFollowInfo>({
    type: fetchFollowInfo.toString(),
  });
  return data || {};
};

interface IUseFollowProps {
  followAddress: string;
}

export const useFollow = ({ followAddress }: IUseFollowProps) => {
  const { isConnected } = useAccount();

  const dispatch = useDispatchRequest();
  const { address: accountAddress } = useAccount();

  const { loading } = useMutation({
    type: toggleFollow.toString(),
  });

  const isFollowDisabled = loading || !isConnected || !followAddress;

  const {
    isFollow: initIsFollowd,
    followState: initFollowState,
    followersCount,
    followingCount,
  } = useIsFollowd({
    followAddress,
  });

  const [isFollowd, setIsFollowd] = useState(initIsFollowd);
  const [followState, setFollowState] = useState(initFollowState);

  useEffect(() => {
    if (initIsFollowd === isFollowd) return;
    setIsFollowd(initIsFollowd);
    setFollowState(initFollowState);
  }, [initIsFollowd, initFollowState, isFollowd]);

  const onFollowClick = useCallback(async () => {
    if (!accountAddress) {
      return;
    }
    const willFollow =
      followState === TollgeFollowType.Following
        ? TollgeFollowType.UnFollow
        : TollgeFollowType.Following;

    const { data: FollowData } = await dispatch(
      toggleFollow({
        accountAddress: accountAddress,
        followAddress: followAddress,
        ifFollow: willFollow,
      }),
    );
    if (FollowData?.code === 1) {
      setIsFollowd(!isFollowd);
      setFollowState(willFollow);
    } else {
      throw Error('Follow Submit Error');
    }
  }, [
    accountAddress,
    followAddress,
    followState,
    setFollowState,
    setIsFollowd,
    dispatch,
    isFollowd,
  ]);

  return {
    isFollowDisabled,
    isFollowd,
    onFollowClick,
    followState,
    followersCount,
    followingCount,
    toggleLoading: loading,
  };
};
