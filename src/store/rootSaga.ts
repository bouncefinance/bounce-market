import { fork } from 'redux-saga/effects';
import { connectSaga } from '../modules/account/effects/connectSaga';

export function* rootSaga() {
  yield fork(connectSaga);
}
