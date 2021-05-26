import { RequestAction } from '@redux-requests/core';
import { FANGIBLE_URL } from 'modules/common/conts';
import { createAction as createSmartAction } from 'redux-smart-actions';
import {
  IApiBrand,
  IApiQueryBrand,
  mapQueryBrandList,
} from '../api/queryBrand';
import { FetchBrandListAction } from './const';

export const queryBrandList = createSmartAction<
  RequestAction<IApiQueryBrand, IApiBrand[]>
>(FetchBrandListAction, () => {
  return {
    request: {
      url: `${FANGIBLE_URL}/brands?offset=0&count=1000`,
      method: 'get',
    },
    meta: {
      driver: 'axios',
      asMutation: true,
      getData: data => {
        if (data.code !== 200) {
          throw new Error('Unexpected response');
        }
        return mapQueryBrandList(data);
      },
    },
  };
});
