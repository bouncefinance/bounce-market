import { createAction as createSmartAction } from 'redux-smart-actions';

/**
 * 0: open
 * 1: close
 */
export type TypeApePoolState = 0 | 1

export interface IApePoolData {
  price: string;
  swapped_amounta: string;
  name: string;
  pool_id: string;
  state: TypeApePoolState;
  total_amounta: string; // wei
  total_amountb: string; // wei; need total price
  creator: string;
  tokena: string;
  tokenb: string;
}
export interface IApePoolMArketRes {
  code: number;
  msg?: string;
  data: IApePoolData[];
  total: number
}
export const fetchOnsellApeMarketPools = createSmartAction<
  any,
  [
    {
      useraddress: string;
      offset: number;
      limit?: number;
    },
  ]
>('get_onsell_apepools', ({ useraddress, offset, limit = 20}) => {
  return {
    request: {
      url: '/get_onsell_apepools',
      method: 'post',
      data: {
        useraddress,
        offset,
        limit
      },
    },
    meta: {
      asMutation: false,
      driver: 'axios',
      getData: (data: IApePoolMArketRes) => {
        if (data.code !== 200) {
          throw new Error(data.msg);
        }
        return data;
      },
    },
  };
});
