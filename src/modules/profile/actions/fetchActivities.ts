import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { IActivityData, IActivityItem } from '../api/getActivity';

interface IFetchActivitiesVariables {
  user: string;
}

export const fetchActivities = createSmartAction<
  RequestAction<IActivityData, IActivityItem[]>
>('fetchActivities', (payload: IFetchActivitiesVariables) => ({
  request: {
    url: process.env.REACT_APP_ACTIVITIES_URL,
    method: 'get',
    params: { user_address: payload.user },
  },
  meta: {
    auth: true,
    driver: 'axios',
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
            event: item.event,
            contract: item.contract,
            from: item.from,
            to: item.to,
            tokenId: item.tokenId,
            quantity: item.quantity,
            price: new BigNumber(Web3.utils.fromWei(item.price)), // TODO: need provide decimal
            timestamp: (item.timestamp || item.Timestamp) * 1000,
          };
        })
        .filter(item => item.tokenId <= 99999999999);
    },
  },
}));
