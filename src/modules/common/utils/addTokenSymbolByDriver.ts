import { RequestAction, RequestsStore } from '@redux-requests/core';

export function addTokenSymbolByDriver(
  response: any,
  action: RequestAction,
  store: RequestsStore,
) {
  if (action.meta && response.data) {
    // const tokenSymbol = getTokenByDriver(
    //   action.meta.driver as DriverName,
    //   ZERO_ADDRESS,
    // );
    // response.data.tokenSymbol = tokenSymbol;
    response.data.tokenSymbol = 'APE';
  }
  return response;
}
