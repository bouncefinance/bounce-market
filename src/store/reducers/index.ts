import { History } from 'history';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { userPersistConfig } from './webStorageConfigs';
import { persistReducer } from 'redux-persist';
import { IUserState, userReducer } from './userReducer';

export interface IStoreState {
  router: RouterState;
  user: IUserState;
}

export const createRootReducer = (history: History, requestsReducer: Reducer) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    requests: (store: IStoreState, action: AnyAction) =>
      requestsReducer(store, action),
  });
