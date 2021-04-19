import { put, putResolve, select, take, takeEvery } from 'redux-saga/effects';
import { END, eventChannel } from 'redux-saga';
import { RootState } from '../../../store/store';
import { AccountActions } from '../store/accountActions';
import { getQuery, resetRequests } from '@redux-requests/core';

// TODO Check disconnection, switch chain, switch account

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
    provider
      .on('accountsChanged', (accounts: Address[]) => {
        emitter({
          data: { accounts },
          type: WalletEventType.AccountChanged,
        } as IAccountChangedEvent);
      })
      .on('disconnect', (error: Error) => {
        emitter({
          error,
          type: WalletEventType.Disconnect,
        } as IDisconnectEvent);
        emitter(END);
      })
      .on('message', (message: any) => {
        emitter({ message, type: WalletEventType.Message });
      })
      .on('chainChanged', (chainId: string) => {
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

function* onConnectWallet() {
  const { action } = yield putResolve(AccountActions.setAccount());
  const provider = action.meta.provider;

  const channel = createEventChannel(provider);
  while (true) {
    const event: ProviderEvent = yield take(channel);

    if (event.type === WalletEventType.ChainChanged) {
      yield put(resetRequests([AccountActions.setAccount.toString()]));
    } else if (event.type === WalletEventType.AccountChanged) {
      const address =
        event.data.accounts.length > 0 ? event.data.accounts[0] : undefined;

      const { currentAddress } = yield select((state: RootState) => {
        const {
          data: { address },
        } = getQuery(state, {
          type: AccountActions.setAccount.toString(),
          action: AccountActions.setAccount,
        });

        return { currentAddress: address };
      });

      if (currentAddress.toLowerCase() !== address?.toLowerCase()) {
        yield put(AccountActions.connect());
      }
    }
  }
}

export function* connectSaga() {
  yield takeEvery(AccountActions.connect.toString(), onConnectWallet);
}
