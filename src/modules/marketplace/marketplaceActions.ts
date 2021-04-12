import { createAction as createSmartAction } from 'redux-smart-actions';
import { getMarketplaceItems } from './api/getMarketplaceItems';

export const MarketplaceActions = {
  fetchMarketplaceItems: createSmartAction('FETCH_MARKETPLACE_ITEMS', () => ({
    request: {
      promise: (async function () {
        return await getMarketplaceItems();
      })(),
    },
  })),
};
