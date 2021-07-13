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
import { BlockchainNetworkId, ZERO_ADDRESS } from '../modules/common/conts';
import { Address } from '../modules/common/types/unit';
import { TokenSymbol } from '../modules/common/types/TokenSymbol';

type MainApiDriverName =
  | 'mainApiEthMainnet'
  | 'mainApiEthRinkeby'
  | 'mainApiSmartchain'
  | 'mainApiHeco'
  | 'mainApiMatic';

const chainToMainApiDriver: {
  [key in BlockchainNetworkId]: MainApiDriverName | undefined;
} = {
  [BlockchainNetworkId.mainnet]: 'mainApiEthMainnet',
  [BlockchainNetworkId.ropsten]: undefined,
  [BlockchainNetworkId.rinkeby]: 'mainApiEthRinkeby',
  [BlockchainNetworkId.goerli]: undefined,
  [BlockchainNetworkId.dev]: undefined,
  [BlockchainNetworkId.classic]: undefined,
  [BlockchainNetworkId.mordor]: undefined,
  [BlockchainNetworkId.kotti]: undefined,
  [BlockchainNetworkId.smartchain]: 'mainApiSmartchain',
  [BlockchainNetworkId.smartchainTestnet]: undefined,
  [BlockchainNetworkId.heco]: 'mainApiHeco',
  [BlockchainNetworkId.matic]: 'mainApiMatic',
};

function getMainApiDriverName(chainId: BlockchainNetworkId): MainApiDriverName {
  return chainToMainApiDriver[chainId] || 'mainApiSmartchain';
}

type NftViewApiDriverName =
  | 'nftViewApiEthMainnet'
  | 'nftViewApiEthRinkeby'
  | 'nftViewApiSmartchain'
  | 'nftViewApiHeco'
  | 'nftViewApiMatic';

const chainNftViewApiDriver: {
  [key in BlockchainNetworkId]: NftViewApiDriverName | undefined;
} = {
  [BlockchainNetworkId.mainnet]: 'nftViewApiEthMainnet',
  [BlockchainNetworkId.ropsten]: undefined,
  [BlockchainNetworkId.rinkeby]: 'nftViewApiEthRinkeby',
  [BlockchainNetworkId.goerli]: undefined,
  [BlockchainNetworkId.dev]: undefined,
  [BlockchainNetworkId.classic]: undefined,
  [BlockchainNetworkId.mordor]: undefined,
  [BlockchainNetworkId.kotti]: undefined,
  [BlockchainNetworkId.smartchain]: 'nftViewApiSmartchain',
  [BlockchainNetworkId.smartchainTestnet]: undefined,
  [BlockchainNetworkId.heco]: 'nftViewApiHeco',
  [BlockchainNetworkId.matic]: 'nftViewApiMatic',
};

function getNftViewApiDriverName(
  chainId: BlockchainNetworkId,
): NftViewApiDriverName {
  return chainNftViewApiDriver[chainId] || 'nftViewApiSmartchain';
}

type NftView2ApiDriverName =
  | 'nftView2ApiEthMainnet'
  | 'nftView2ApiEthRinkeby'
  | 'nftView2ApiSmartchain'
  | 'nftView2ApiHeco'
  | 'nftView2ApiMatic';

const chainNftView2ApiDriver: {
  [key in BlockchainNetworkId]: NftView2ApiDriverName | undefined;
} = {
  [BlockchainNetworkId.mainnet]: 'nftView2ApiEthMainnet',
  [BlockchainNetworkId.ropsten]: undefined,
  [BlockchainNetworkId.rinkeby]: 'nftView2ApiEthRinkeby',
  [BlockchainNetworkId.goerli]: undefined,
  [BlockchainNetworkId.dev]: undefined,
  [BlockchainNetworkId.classic]: undefined,
  [BlockchainNetworkId.mordor]: undefined,
  [BlockchainNetworkId.kotti]: undefined,
  [BlockchainNetworkId.smartchain]: 'nftView2ApiSmartchain',
  [BlockchainNetworkId.smartchainTestnet]: undefined,
  [BlockchainNetworkId.heco]: 'nftView2ApiHeco',
  [BlockchainNetworkId.matic]: 'nftView2ApiMatic',
};

function getNftView2ApiDriverName(
  chainId: BlockchainNetworkId,
): NftView2ApiDriverName {
  return chainNftView2ApiDriver[chainId] || 'nftView2ApiSmartchain';
}

export type DriverName =
  | MainApiDriverName
  | NftViewApiDriverName
  | NftView2ApiDriverName;

export function getTokenByDriver(
  driverName: DriverName,
  unitAddress?: Address,
) {
  if (
    driverName === 'mainApiEthMainnet' ||
    driverName === 'mainApiEthRinkeby'
  ) {
    if (unitAddress === ZERO_ADDRESS) {
      return TokenSymbol.ETH;
    }
  }

  if (driverName === 'mainApiSmartchain') {
    if (unitAddress === ZERO_ADDRESS) {
      return TokenSymbol.BNB;
    }
  }

  if (driverName === 'mainApiHeco') {
    if (unitAddress === ZERO_ADDRESS) {
      return TokenSymbol.HT;
    }
  }

  if (driverName === 'mainApiMatic') {
    if (unitAddress === ZERO_ADDRESS) {
      return TokenSymbol.MATIC;
    }
  }

  return TokenSymbol.BNB;
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
    mainApiEthRinkeby: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_API_BASE_RINKEBY,
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
    mainApiMatic: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_API_BASE_MATIC,
      }),
    ),
    nftViewApiEthMainnet: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_FANGIBLE_URL_ETH_MAINNET,
      }),
    ),
    nftViewApiEthRinkeby: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_FANGIBLE_URL_RINKEBY,
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
    nftViewApiMatic: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_FANGIBLE_URL_MATIC,
      }),
    ),
    nftView2ApiEthMainnet: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_NFTVIEW_URL_V2_ETH_MAINNET,
      }),
    ),
    nftView2ApiEthRinkeby: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_NFTVIEW_URL_V2_RINKEBY,
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
    nftView2ApiMatic: createAxiosDriver(
      axios.create({
        baseURL: process.env.REACT_APP_NFTVIEW_URL_V2_MATIC,
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
