import { RequestAction, RequestsStore } from '@redux-requests/core';
import { DriverName, getTokenByDriver } from 'store';
import { ZERO_ADDRESS } from '../conts';

export function addTokenSymbolByDriver(
  response: any,
  action: RequestAction,
  store: RequestsStore,
) {
  if (action.meta && response.data) {
    const tokenSymbol = getTokenByDriver(
      action.meta.driver as DriverName,
      ZERO_ADDRESS,
    );
    response.data.tokenSymbol = tokenSymbol;
    // response.data.tokenSymbol = 'APE';
  }
  return response;
}
