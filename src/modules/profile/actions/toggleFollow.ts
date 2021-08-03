import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

export enum ToggleFollowType {
  UnFollow,
  Following,
}

interface ITollgeFollow {
  code: number;
  msg: any;
  followingCount: number;
  followersCount: number;
  myfollowersCount: number;
  myfollowingCount: number;
}

interface IFetchTollgeFollowArgs {
  accountAddress: string;
  followAddress: string;
  ifFollow: ToggleFollowType;
}

export const toggleFollow = createSmartAction<
  RequestAction<ITollgeFollow, any>,
  [IFetchTollgeFollowArgs]
>(
  'toggleFollow',
  ({ accountAddress, followAddress, ifFollow }: IFetchTollgeFollowArgs) => ({
    request: {
      url: '/auth/dealaccountfollow',
      method: 'post',
      data: {
        accountaddress: accountAddress,
        followaddress: followAddress,
        iffollow: ifFollow,
      },
    },
    meta: {
      auth: true,
      asMutation: true,
      driver: 'axios',
      requestsCapacity: 2,
      getData: data => {
        if (data.code !== 1) {
          return new Error(data.msg);
        }

        return data as ITollgeFollow;
      },
    },
  }),
);
