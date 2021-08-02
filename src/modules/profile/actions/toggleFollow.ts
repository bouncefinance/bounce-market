import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

export enum TollgeFollowType {
  UnFollow,
  Following,
}

interface ITollgeFollow {
  code: number;
  msg: any;
}

interface IFetchTollgeFollowArgs {
  accountAddress: string;
  followAddress: string;
  ifFollow: TollgeFollowType;
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
      // requestKey: params.requestKey,
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
