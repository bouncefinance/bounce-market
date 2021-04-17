import { configureStore } from '@reduxjs/toolkit';
import { i18nSlice } from 'modules/i18n/i18nSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { getQuery, handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/promise';
import { historyInstance } from '../modules/common/utils/historyInstance';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';
import { createDriver as createAxiosDriver } from '@redux-requests/axios';
import axios from 'axios';
import { BASE_URL } from '../modules/common/conts';
import { AccountActions } from '../modules/account/store/accountActions';
import { notificationSlice } from '../modules/notification/store/notificationSlice';
import { NotificationActions } from '../modules/notification/store/NotificationActions';
import { extractMessage } from '../modules/common/utils/extractError';

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

    const { data } = getQuery(rootState, {
      type: AccountActions.setAccount.toString(),
      action: AccountActions.setAccount,
    });

    // TODO Throw exception if auth and no token?

    if (action.meta?.auth) {
      return {
        ...request,
        headers: {
          ...request.headers,
          ...(request.method !== 'GET'
            ? { 'Content-Type': 'application/x-www-from-urlencoded' }
            : {}),
          token: data?.token ?? '',
        },
      };
    }
    return request;
  },
  onError: (error, action, store) => {
    if (!action.meta?.suppressError) {
      store.dispatch(
        NotificationActions.showNotification({
          message: extractMessage(error),
          severity: 'error',
        }),
      );
    }

    throw error;
  },
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    i18n: i18nSlice.reducer,
    requests: requestsReducer,
    router: connectRouter(historyInstance),
    notifications: notificationSlice.reducer,
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
