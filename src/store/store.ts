import { configureStore } from '@reduxjs/toolkit';
import { i18nSlice } from 'modules/i18n/i18nSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/promise';
import { isDev } from '../modules/common/utils/isProd';
import { historyInstance } from '../modules/common/utils/historyInstance';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';
import { connectionSlice } from '../modules/wallet/connectionSlice';

const { requestsReducer, requestsMiddleware } = handleRequests({
  driver: createDriver({
    processResponse: response => ({ data: response }),
  }),
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
    wallet: connectionSlice.reducer,
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
