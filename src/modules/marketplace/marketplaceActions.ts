import { createAction as createSmartAction } from 'redux-smart-actions';
import { getPools, IPoolsData } from './api/getPools';
import { RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from '../../store/store';

interface IFetchItemsParams {
  ids?: number[];
  category?: string;
  channel?: string;
}

export const MarketplaceActions = {
  fetchPools: createSmartAction('FETCH_POOLS', () => ({
    request: {
      promise: (async function () {
        return await getPools();
      })(),
    },
    meta: {
      onSuccess: (
        request: { data: IPoolsData },
        action: RequestAction,
        store: Store<RootState>,
      ) => {
        const ids = request.data.tradePools
          .concat(request.data.tradeAuctions)
          .map(item => item.tokenId);

        store.dispatch(MarketplaceActions.fetchItems({ ids }));
        return request;
      },
    },
    asQuery: true,
  })),
  fetchItems: createSmartAction('FETCH_ITEMS', (params: IFetchItemsParams) => ({
    request: {
      url: '/api/v2/main/getitemsbyfilter',
      method: 'post',
      data: params,
    },
    meta: {
      auth: true,
      driver: 'axios',
      asMutation: false,
    },
  })),
};
