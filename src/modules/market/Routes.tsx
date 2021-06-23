import React from 'react';
import { RouteConfiguration } from '../common/types/RouteConfiguration';
import { Market } from './screens/Market';

const PATH_MARKET = '/market';

export const MarketRoutesConfig: { [key: string]: RouteConfiguration } = {
  Market: {
    path: PATH_MARKET,
    generatePath: () => PATH_MARKET,
  },
};

export function MarketRoutes() {
  return <Market />;
}
