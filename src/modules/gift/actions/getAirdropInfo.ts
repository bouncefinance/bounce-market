import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IApiGetAirdropInfo } from '../api/getAirdropInfo';

interface IGetAirdropInfoArgs {
  dropsid: number;
}

export interface IGetAirdropInfoPayload {
  accountaddress: string;
  title: string;
  description: string;
  coverimgurl: string;
  dropdate: number;
  state: number;
  creator: string;
  avatar: string;
  airdropinfo: {
    brandname: string;
    totalsupply: number;
    brandimgurl: string;
    opendate: number;
    collection: string;
    logourl: string;
  };
}

export const getAirdropInfo = createSmartAction<
  RequestAction<IApiGetAirdropInfo, IGetAirdropInfoPayload | null>,
  [IGetAirdropInfoArgs]
>('getAirdropInfo', params => ({
  request: {
    url: `/getonedropsdetail`,
    method: 'post',
    data: params,
  },
  meta: {
    driver: 'airdropAxios',
    getData: data => {
      if (data.code !== 200) {
        console.error('getonedropsdetail:', 'Unexpected response');
        return null;
      }

      return {
        ...data.data,
      };
    },
  },
}));
