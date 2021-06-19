import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IApiQueryBrand, mapQueryBrandAddress } from '../api/queryBrand';
import { QueryBrandAddressAction } from './const';

export const queryBrandAddress = createSmartAction<
  RequestAction<IApiQueryBrand, string>,
  [{ address: string }]
>(QueryBrandAddressAction, data => {
  const address: string = data.address;
  return {
    request: {
      url: `/brands?offset=0&count=1000&user_address=${address}`,
      method: 'get',
    },
    meta: {
      driver: 'nftview',
      asMutation: true,
      getData: data => {
        if (data.code !== 200) {
          throw new Error('Unexpected response');
        }
        return mapQueryBrandAddress(data, address);
      },
    },
  };
});
