import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { IActivityData, IActivityItem } from '../api/getActivity';

export interface IFetchActivitiesVariables {
  accountaddress: string;
  filter: 1 | 2 | 3 | 4 | 5 | 6;
}

export const fetchActivities = createSmartAction<
  RequestAction<IActivityData, IActivityItem[]>
>('fetchActivities', (data: IFetchActivitiesVariables) => ({
  request: {
    url: '/auth/gettxsbyfilter',
    method: 'post',
    data,
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

      return activities.map(item => {
        return {
          itemname: item.itemname,
          event: item.event,
          supply: item.supply,
          quantity: item.quantity,
          itemName: item.itemname,
          from: item.from,
          fromName: item.fromname,
          fromUrl: item.fromurl,
          to: item.to,
          toName: item.toname,
          toUrl: item.tourl,
          fileUrl: item.fileurl,
          amount: new BigNumber(Web3.utils.fromWei(item.amount.toString())), // TODO: need provide decimal
          ctime: item.ctime * 1000,
          category: item.category,
        };
      });
    },
  },
}));
