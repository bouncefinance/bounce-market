import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';

import { useAccount } from 'modules/account/hooks/useAccount';
import {
  fetchFollowInfo,
  IFollowInfo,
} from 'modules/profile/actions/fetchFollowInfo';
import {
  toggleFollow,
  ToggleFollowType,
} from 'modules/profile/actions/toggleFollow';
import { useCallback, useEffect, useState } from 'react';

interface IUseFollowProps {
  followAddress: string;
  setFollowersCount?: (flag: number) => void;
}

export const useFollow = ({
  followAddress,
  setFollowersCount,
}: IUseFollowProps) => {
  const dispatch = useDispatchRequest();
  const dispatchRequest = useDispatchRequest();
  const { isConnected, address: accountAddress } = useAccount();
  const isHiddenFollowBtn =
    !isConnected || !followAddress || accountAddress === followAddress;

  const { loading } = useMutation({
    type: toggleFollow.toString(),
  });

  const isFollowDisabled = loading || !isConnected || !followAddress;

  useEffect(() => {
    if (accountAddress) {
      dispatchRequest(
        fetchFollowInfo({
          accountAddress: accountAddress,
          followAddress: followAddress,
        }),
      );
    }
  }, [followAddress, dispatch, dispatchRequest, accountAddress]);

  const { data } = useQuery<IFollowInfo>({
    type: fetchFollowInfo.toString(),
  });

  const [isFollowd, setIsFollowd] = useState(data?.isFollow);
  const [followState, setFollowState] = useState(data?.followState);
  useEffect(() => {
    if (!data) return;
    setIsFollowd(data.isFollow);
    setFollowState(data.followState);
  }, [data]);

  const onFollowClick = useCallback(
    async ({
      tarAddress = followAddress,
      account = accountAddress,
      state = followState,
    }: {
      tarAddress?: string;
      account?: string;
      state?: ToggleFollowType;
    }) => {
      if (isFollowDisabled || !account) {
        return;
      }

      const willFollowState =
        state === ToggleFollowType.Following
          ? ToggleFollowType.UnFollow
          : ToggleFollowType.Following;

      const { data: FollowData } = await dispatch(
        toggleFollow({
          accountAddress: account,
          followAddress: tarAddress,
          ifFollow: willFollowState,
        }),
      );
      if (FollowData?.code === 1) {
        setIsFollowd(willFollowState === ToggleFollowType.Following);
        setFollowState(willFollowState);
        setFollowersCount && setFollowersCount(FollowData.followersCount);
        return FollowData;
      } else {
        throw Error('Follow Submit Error');
      }
    },
    [
      accountAddress,
      followAddress,
      followState,
      dispatch,
      isFollowDisabled,
      setFollowersCount,
    ],
  );

  return {
    isFollowDisabled,
    isFollowd,
    onFollowClick,
    followState,
    toggleLoading: loading,
    isHiddenFollowBtn,
  };
};
