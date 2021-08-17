import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { ProfileRoutesConfig } from '../ProfileRoutes';
import { ToggleFollowType } from './toggleFollow';

interface IpayloadArgs {
  accountaddress: string;
  followaddress: string;
  limit: number;
  offset: number;
}

interface IFetchResult {
  code: number;
  data: IFetchFollowList[];
  total: number;
}

interface IFetchFollowList {
  username: string;
  useravatar: string;
  useraddress: string;
  accountaddress: string;
  totalfollows: number;
  ififollow: ToggleFollowType;
}

export interface IFollowListItem {
  userName: string;
  userId: string;
  href: string;
  userFollowers: number;
  imgSrc: string;
  follow: boolean;
  followState: ToggleFollowType;
  followerAddress: string;
}

const mapFollowItemData = (item: IFetchFollowList): IFollowListItem => {
  return {
    userName: item.username,
    userId: item.useraddress,
    href:
      item.useraddress &&
      ProfileRoutesConfig.OtherProfile.generatePath(item.useraddress),
    userFollowers: item.totalfollows,
    imgSrc: item.useravatar,
    follow: item.ififollow === ToggleFollowType.Following,
    followState: item.ififollow,
    followerAddress: item.useraddress,
  };
};

export const fetchFollowersList = createSmartAction<
  RequestAction<IFetchResult, IFollowListItem[]>
>('fetchFollowersList', (payload: IpayloadArgs, meta) => ({
  request: {
    url: '/getaccountfollows',
    method: 'post',
    data: payload,
  },
  meta: {
    driver: 'axios',
    auth: true,
    ...meta,
    asMutation: false,
    getData: data => {
      if (data.code !== 1) {
        return [];
      }
      return data?.data.map(mapFollowItemData);
    },
  },
}));

export const fetchFollowingList = createSmartAction<
  RequestAction<IFetchResult, IFollowListItem[]>,
  any
>('fetchFollowingList', (payload: IpayloadArgs) => ({
  request: {
    url: '/getaccountfollowings',
    method: 'post',
    data: payload,
  },
  meta: {
    driver: 'axios',
    auth: false,
    asMutation: false,
    getData: data => {
      if (data.code !== 1) {
        return [];
      }
      return data?.data.map(mapFollowItemData);
    },
  },
}));
