import {
  call,
  put,
  SagaReturnType,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { connectWallet } from '../api/connectWallet';
import { BASE_URL } from '../../common/conts';
import axios from 'axios';
import { connect, connectionSlice } from '../connectionSlice';
import { END, eventChannel } from 'redux-saga';
import { RootState } from '../../../store/store';

// TODO Check disconnection, swicth schain, switch account

enum WalletEventType {
  'AccountChanged' = 'AccountChanged',
  'Disconnect' = 'Disconnect',
  'Message' = 'Message',
  'ChainChanged' = 'ChainChanged',
}

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export interface IAccountChangedEvent {
  type: WalletEventType.AccountChanged;
  data: {
    accounts: Address[];
  };
}

export interface IDisconnectEvent {
  type: WalletEventType.Disconnect;
  error: ProviderRpcError;
}

export interface IMessageEvent {
  type: WalletEventType.Message;
  data: any;
}

export interface IChainChangedEvent {
  type: WalletEventType.ChainChanged;
  data: { chainId: string };
}

export type ProviderEvent =
  | IAccountChangedEvent
  | IDisconnectEvent
  | IMessageEvent
  | IChainChangedEvent;

export type Address = string;

function createEventChannel(provider: any) {
  return eventChannel(emitter => {
    provider.on('accountsChanged', (accounts: Address[]) => {
      emitter({
        data: { accounts },
        type: WalletEventType.AccountChanged,
      } as IAccountChangedEvent);
    });
    provider.on('disconnect', (error: Error) => {
      emitter({ error, type: WalletEventType.Disconnect } as IDisconnectEvent);
      emitter(END);
    });
    provider.on('message', (message: any) => {
      emitter({ message, type: WalletEventType.Message });
    });
    provider.on('chainChanged', (chainId: string) => {
      emitter({
        data: { chainId },
        type: WalletEventType.ChainChanged,
      } as IChainChangedEvent);
    });

    return () => {
      provider.disconnect();
    };
  });
}

const SIGN_STR = 'Welcome to Bounce!';

interface IParams {
  accountaddress: string;
  message: string;
  signature: string;
}

function getAuthToken(params: IParams) {
  return axios.post<{ data: { token: string } }>(
    BASE_URL + '/api/v2/main/jwtauth',
    params,
  );
}

function* onConnectWallet() {
  const [web3, provider]: SagaReturnType<typeof connectWallet> = yield call(
    connectWallet,
  );
  const addresses: SagaReturnType<typeof web3.eth.getAccounts> = yield call(
    web3.eth.getAccounts,
  );
  const address = addresses[0];
  const signature: SagaReturnType<typeof web3.eth.personal.sign> = yield call(
    web3.eth.personal.sign,
    SIGN_STR,
    address,
    '',
  );

  const params: IParams = {
    accountaddress: address,
    message: SIGN_STR,
    signature: signature,
  };

  const authResponse: SagaReturnType<typeof getAuthToken> = yield call(
    getAuthToken,
    params,
  );

  yield put(
    connectionSlice.actions.setAccount({
      address,
      token: authResponse.data.data.token,
    }),
  );
  const channel = createEventChannel(provider);

  while (true) {
    const event: ProviderEvent = yield take(channel);

    if (event.type === WalletEventType.ChainChanged) {
      yield put(connectionSlice.actions.disconnect());
    } else if (event.type === WalletEventType.AccountChanged) {
      const address =
        event.data.accounts.length > 0 ? event.data.accounts[0] : undefined;

      const { currentAddress } = yield select((store: RootState) => {
        return { currentAddress: store.wallet.address };
      });

      if (currentAddress.toLowerCase() !== address?.toLowerCase()) {
        yield put(connect());
      }
    }
  }
}

export function* connectSaga() {
  yield takeEvery(connect.toString(), onConnectWallet);
}
