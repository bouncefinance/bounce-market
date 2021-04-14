import { fork } from 'redux-saga/effects';
import { connectSaga } from '../modules/wallet/effects/connectSaga';

export function* rootSaga() {
  yield fork(connectSaga);
}
