import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { IActivityData, IActivityItem } from '../api/getActivity';

interface IFetchActivitiesVariables {
  user: string;
}

export const fetchActivities = createSmartAction<
  RequestAction<IActivityData, IActivityItem[]>
>('fetchActivities', (payload: IFetchActivitiesVariables) => ({
  request: {
    url: '/auth/getactivities',
    method: 'post',
    data: {
      offset: 0,
      limit: 100,
      useraddress: payload.user,
    },
  },
  meta: {
    driver: 'axios',
    auth: true,
    asMutation: false,
    getData: data => {
      if (data.code !== 1 && data.code !== 200) {
        throw new Error('Unexpected response');
      }

      const activities = data.data;

      if (!activities) return [];

      return activities
        .map(item => {
          return {
            id: item.id,
            event: item.auction_event,
            contract: item.contract,
            from: item.from,
            to: item.to,
            tokenId: item.token_id,
            quantity: item.quantity,
            price: new BigNumber(Web3.utils.fromWei(item.price)), // TODO: need provide decimal
            timestamp: item.ctime * 1000,
          };
        })
        .filter(item => item.tokenId <= 99999999999);
    },
  },
}));
