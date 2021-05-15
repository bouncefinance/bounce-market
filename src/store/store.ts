import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { i18nSlice } from 'modules/i18n/i18nSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { getQuery, handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/promise';
import { historyInstance } from '../modules/common/utils/historyInstance';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';
import { createDriver as createAxiosDriver } from '@redux-requests/axios';
import axios from 'axios';
import { API_BASE } from '../modules/common/conts';
import { notificationSlice } from '../modules/notification/store/notificationSlice';
import { NotificationActions } from '../modules/notification/store/NotificationActions';
import { extractMessage } from '../modules/common/utils/extractError';
import { setAccount } from '../modules/account/store/actions/setAccount';
import { persistStore, persistReducer } from 'redux-persist';
import { i18nPersistConfig } from './webStorageConfigs';

const { requestsReducer, requestsMiddleware } = handleRequests({
  driver: {
    default: createDriver({
      processResponse: response => ({ data: response }),
    }),
    axios: createAxiosDriver(
      axios.create({
        baseURL: API_BASE,
      }),
    ),
  },
  onRequest: (request, action, store) => {
    const rootState: RootState = store.getState();

    const { data } = getQuery(rootState, {
      type: setAccount.toString(),
      action: setAccount,
    });

    // TODO Throw exception if auth and no token?

    if (action.meta?.auth) {
      return {
        ...request,
        headers: {
          ...request.headers,
          token: data?.token ?? '',
        },
      };
    }
    return request;
  },
  onError: (error, action, store) => {
    if (!action.meta?.suppressErrorNotification) {
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

const rootReducer = combineReducers({
  i18n: persistReducer(i18nPersistConfig, i18nSlice.reducer),
  requests: requestsReducer,
  router: connectRouter(historyInstance),
  notifications: notificationSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...requestsMiddleware,
    routerMiddleware(historyInstance),
    sagaMiddleware,
  ],
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
