import { applyMiddleware, compose, createStore, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import { createRootReducer } from './reducers';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/promise';
import { History } from 'history';
import { isDev } from '../modules/common/utils/isProd';

export interface IApplicationStore {
  store: Store;
}

export const persistApplicationStore = ({ store }: IApplicationStore) => {
  return persistStore(store);
};

export const createApplicationStore = ({
  history,
}: {
  history: History;
}): IApplicationStore => {
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

  const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          trace: true,
          traceLimit: 25,
        })
      : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(...requestsMiddleware, routerMiddleware(history)),
  );

  const store = createStore(
    createRootReducer(history, requestsReducer),
    enhancer,
  );

  return { store };
};
