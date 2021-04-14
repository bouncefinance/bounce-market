import { configureStore } from '@reduxjs/toolkit';
import { i18nSlice } from 'modules/i18n/i18nSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/promise';
import { isDev } from '../modules/common/utils/isProd';
import { historyInstance } from '../modules/common/utils/historyInstance';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';
import { accountSlice } from '../modules/account/accountSlice';
import { createDriver as createAxiosDriver } from '@redux-requests/axios';
import axios from 'axios';
import { BASE_URL } from '../modules/common/conts';

const { requestsReducer, requestsMiddleware } = handleRequests({
  driver: {
    default: createDriver({
      processResponse: response => ({ data: response }),
    }),
    axios: createAxiosDriver(
      axios.create({
        baseURL: BASE_URL,
      }),
    ),
  },
  onRequest: (request, action, store) => {
    const rootState: RootState = store.getState();

    if (action.meta?.auth) {
      return {
        ...request,
        headers: {
          ...request.headers,
          ...(request.method !== 'GET'
            ? { 'Content-Type': 'application/x-www-from-urlencoded' }
            : {}),
          token: rootState.account.token,
        },
      };
    }
    return request;
  },
  ...(isDev()
    ? {
        onError: error => {
          console.error(error);
          throw error;
        },
      }
    : {}),
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    i18n: i18nSlice.reducer,
    requests: requestsReducer,
    router: connectRouter(historyInstance),
    account: accountSlice.reducer,
  },
  middleware: [
    ...requestsMiddleware,
    routerMiddleware(historyInstance),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
