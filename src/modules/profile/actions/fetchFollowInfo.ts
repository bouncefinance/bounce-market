import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { ToggleFollowType } from './toggleFollow';

interface IFollowInfoData {
  code: number;
  msg?: string;
  iffollow?: boolean;
  followersCount?: number;
  followingCount?: number;
}

export interface IFollowInfo {
  isFollow: boolean;
  followState: ToggleFollowType;
  followersCount: number;
  followingCount: number;
}

interface IFetchFollowInfoArgs {
  accountAddress: string;
  followAddress: string;
}

const mapFollowData = (data: IFollowInfoData): IFollowInfo => {
  return {
    isFollow: data.iffollow || false,
    followState: data.iffollow
      ? ToggleFollowType.Following
      : ToggleFollowType.UnFollow,
    followersCount: data.followersCount || 0,
    followingCount: data.followersCount || 0,
  };
};

export const fetchFollowInfo = createSmartAction<
  RequestAction<IFollowInfoData, IFollowInfo | null>,
  [IFetchFollowInfoArgs]
>(
  'fetchFollowInfo',
  ({ accountAddress, followAddress }: IFetchFollowInfoArgs) => ({
    request: {
      url: '/auth/ifuserfollow',
      method: 'post',
      data: {
        accountaddress: accountAddress,
        followaddress: followAddress,
      },
    },
    meta: {
      auth: true,
      asMutation: false,
      driver: 'axios',
      getData: data => {
        if (data.code !== 1) {
          console.error('fetchFollowInfo:', data?.msg ?? 'Unexpected error');
        }

        return mapFollowData(data);
      },
    },
  }),
);
