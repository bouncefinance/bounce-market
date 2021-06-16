import { createDriver as createAxiosDriver } from '@redux-requests/axios';
import { abortRequests, handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/promise';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { tokenLocalStorageKey } from 'constants/index';
import { i18nSlice } from 'modules/i18n/i18nSlice';
import { layoutReducer, LAYOUT_STATE_NAME } from 'modules/layout/store/layout';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { API_BASE } from '../modules/common/conts';
import { extractMessage } from '../modules/common/utils/extractError';
import { historyInstance } from '../modules/common/utils/historyInstance';
import { NotificationActions } from '../modules/notification/store/NotificationActions';
import { notificationSlice } from '../modules/notification/store/notificationSlice';
import loginReducer from './login';
import { rootSaga } from './rootSaga';
import { i18nPersistConfig } from './webStorageConfigs';

const axiosInit = axios.create({
  baseURL: API_BASE,
});
axiosInit.interceptors.response.use(response => {
  // token invalid
  if ([-1, -2].includes(response.data?.errorCode)) {
    store.dispatch(abortRequests());
    store.getState().login.outLogin();
  }
  return response;
});

const { requestsReducer, requestsMiddleware } = handleRequests({
  driver: {
    default: createDriver({
      processResponse: response => ({ data: response }),
    }),
    axiosSmartchain: createAxiosDriver(axiosInit),
  },
  onRequest: (request, action, store) => {
    const data = {
      token: localStorage.getItem(tokenLocalStorageKey),
    };

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
  [LAYOUT_STATE_NAME]: layoutReducer,
  login: loginReducer,
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
