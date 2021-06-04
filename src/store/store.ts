import { createDriver as createAxiosDriver } from '@redux-requests/axios';
import { getQuery, handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/promise';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { i18nSlice } from 'modules/i18n/i18nSlice';
import { LAYOUT_STATE_NAME, layoutReducer } from 'modules/layout/store/layout';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { setAccount } from '../modules/account/store/actions/setAccount';
import { extractMessage } from '../modules/common/utils/extractError';
import { historyInstance } from '../modules/common/utils/historyInstance';
import { NotificationActions } from '../modules/notification/store/NotificationActions';
import { notificationSlice } from '../modules/notification/store/notificationSlice';
import { rootSaga } from './rootSaga';
import { i18nPersistConfig } from './webStorageConfigs';
import { BlockchainNetworkId } from '../modules/common/conts';

type MainApiDriverName =
  | 'mainApiEthMainnet'
  | 'mainApiSmartchain'
  | 'mainApiHeco';

const chainToMainApiDriver: {
  [key in BlockchainNetworkId]: MainApiDriverName | undefined;
} = {
  [BlockchainNetworkId.mainnet]: 'mainApiEthMainnet',
  [BlockchainNetworkId.ropsten]: undefined,
  [BlockchainNetworkId.rinkeby]: undefined,
  [BlockchainNetworkId.goerli]: undefined,
  [BlockchainNetworkId.dev]: undefined,
  [BlockchainNetworkId.classic]: undefined,
  [BlockchainNetworkId.mordor]: undefined,
  [BlockchainNetworkId.kotti]: undefined,
  [BlockchainNetworkId.smartchain]: 'mainApiSmartchain',
  [BlockchainNetworkId.smartchainTestnet]: undefined,
  [BlockchainNetworkId.heco]: 'mainApiHeco',
};

function getMainApiDriverName(chainId: BlockchainNetworkId): MainApiDriverName {
  return chainToMainApiDriver[chainId] || 'mainApiSmartchain';
}

type NftViewApiDriverName =
  | 'nftViewApiEthMainnet'
  | 'nftViewApiSmartchain'
  | 'nftViewApiHeco';

const chainNftViewApiDriver: {
  [key in BlockchainNetworkId]: NftViewApiDriverName | undefined;
} = {
  [BlockchainNetworkId.mainnet]: 'nftViewApiEthMainnet',
  [BlockchainNetworkId.ropsten]: undefined,
  [BlockchainNetworkId.rinkeby]: undefined,
  [BlockchainNetworkId.goerli]: undefined,
  [BlockchainNetworkId.dev]: undefined,
  [BlockchainNetworkId.classic]: undefined,
  [BlockchainNetworkId.mordor]: undefined,
  [BlockchainNetworkId.kotti]: undefined,
  [BlockchainNetworkId.smartchain]: 'nftViewApiSmartchain',
  [BlockchainNetworkId.smartchainTestnet]: undefined,
  [BlockchainNetworkId.heco]: 'nftViewApiHeco',
};

function getNftViewApiDriverName(
  chainId: BlockchainNetworkId,
): NftViewApiDriverName {
  return chainNftViewApiDriver[chainId] || 'nftViewApiSmartchain';
}

type NftView2ApiDriverName =
  | 'nftView2ApiEthMainnet'
  | 'nftView2ApiSmartchain'
  | 'nftView2ApiHeco';

const chainNftView2ApiDriver: {
  [key in BlockchainNetworkId]: NftView2ApiDriverName | undefined;
} = {
  [BlockchainNetworkId.mainnet]: 'nftView2ApiEthMainnet',
  [BlockchainNetworkId.ropsten]: undefined,
  [BlockchainNetworkId.rinkeby]: undefined,
  [BlockchainNetworkId.goerli]: undefined,
  [BlockchainNetworkId.dev]: undefined,
  [BlockchainNetworkId.classic]: undefined,
  [BlockchainNetworkId.mordor]: undefined,
  [BlockchainNetworkId.kotti]: undefined,
  [BlockchainNetworkId.smartchain]: 'nftView2ApiSmartchain',
  [BlockchainNetworkId.smartchainTestnet]: undefined,
  [BlockchainNetworkId.heco]: 'nftView2ApiHeco',
};

function getNftView2ApiDriverName(
  chainId: BlockchainNetworkId,
): NftView2ApiDriverName {
  return chainNftView2ApiDriver[chainId] || 'nftView2ApiSmartchain';
}

const { requestsReducer, requestsMiddleware } = handleRequests({
  driver: {
    default: createDriver({
      processResponse: response => ({ data: response }),
    }),
    mainApiEthMainnet: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_API_BASE_ETH_MAINNET,
      }),
    ),
    mainApiSmartchain: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_API_BASE,
      }),
    ),
    mainApiHeco: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_API_BASE_HECO,
      }),
    ),
    nftViewApiEthMainnet: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_FANGIBLE_URL_ETH_MAINNET,
      }),
    ),
    nftViewApiSmartchain: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_FANGIBLE_URL,
      }),
    ),
    nftViewApiHeco: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_FANGIBLE_URL_HECO,
      }),
    ),
    nftView2ApiEthMainnet: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_NFTVIEW_URL_V2_ETH_MAINNET,
      }),
    ),
    nftView2ApiSmartchain: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_NFTVIEW_URL_V2,
      }),
    ),
    nftView2ApiHeco: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_NFTVIEW_URL_V2_HECO,
      }),
    ),
  },
  onRequest: (request, action, store) => {
    const rootState: RootState = store.getState();

    const { data } = getQuery(rootState, {
      type: setAccount.toString(),
      action: setAccount,
    });

    if (action.meta?.driver === 'axios') {
      action.meta = {
        ...action.meta,
        driver:
          data && data.chainId
            ? getMainApiDriverName(data.chainId)
            : 'mainApiSmartchain',
      };
    } else if (action.meta?.driver === 'nftview') {
      action.meta = {
        ...action.meta,
        driver:
          data && data.chainId
            ? getNftViewApiDriverName(data.chainId)
            : 'nftViewApiSmartchain',
      };
    } else if (action.meta?.driver === 'nftview2') {
      action.meta = {
        ...action.meta,
        driver:
          data && data.chainId
            ? getNftView2ApiDriverName(data.chainId)
            : 'nftView2ApiSmartchain',
      };
    }

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
