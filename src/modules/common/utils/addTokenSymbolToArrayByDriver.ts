import { RequestAction, RequestsStore } from '@redux-requests/core';
import { DriverName, getTokenByDriver } from '../../../store';
import { ZERO_ADDRESS } from '../conts';

export function addTokenSymbolToArrayByDriver(
  response: any,
  action: RequestAction,
  store: RequestsStore,
) {
  response.data.forEach((item: any) => {
    if (action.meta) {
      item.tokenSymbol = getTokenByDriver(
        action.meta.driver as DriverName,
        ZERO_ADDRESS,
      );
    }
  });
  return response;
}
