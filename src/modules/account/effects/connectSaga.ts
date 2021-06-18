import { getQuery, resetRequests } from '@redux-requests/core';
import { featuresConfig } from 'modules/common/conts';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { queryLikedItems } from 'modules/profile/actions/queryLikedItems';
import { END, eventChannel } from 'redux-saga';
import { put, putResolve, select, take, takeEvery } from 'redux-saga/effects';
import { RootState } from 'store';
import { Address } from '../../common/types/unit';
import { connect } from '../store/actions/connect';
import { disconnect } from '../store/actions/disconnect';
import { ISetAccountData, setAccount } from '../store/actions/setAccount';
import { updateAccount } from '../store/actions/updateAccount';
// TODO: Check disconnection, switch chain, switch account

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
        console.log('provider disconnect');
        emitter(END);
      })
      .on('message', (message: any) => {
        emitter({ message, type: WalletEventType.Message });
      })
      .on('chainChanged', (chainId: string) => {
        console.log('chainChanged');
        emitter({
          data: { chainId },
          type: WalletEventType.ChainChanged,
        } as IChainChangedEvent);
      });

    return () => {
      if (provider.disconnect instanceof Function) {
        provider.disconnect();
      }
    };
  });
}

function* onConnectWallet() {
  console.log('onConnectWallet');
  const { action, error } = yield putResolve(setAccount());
  if (error || action.type === setAccount.toString() + '_ERROR') {
    console.log('some error');
    return;
  }
  const provider = action.meta.provider;
  yield put(fetchProfileInfo());

  if (featuresConfig.nftLikes) {
    yield put(queryLikedItems());
  }

  const channel = createEventChannel(provider);
  while (true) {
    const event: ProviderEvent = yield take(channel);

    console.log('channel emitted', event);

    if (event.type === WalletEventType.ChainChanged) {
      console.log('do action on ChainChanged');
      if (event.data.chainId) {
        yield put(updateAccount({ chainId: parseInt(event.data.chainId, 16) }));
        yield put(fetchProfileInfo());
      }
    } else if (event.type === WalletEventType.AccountChanged) {
      console.log('do action on AccountChanged');
      const address =
        event.data.accounts.length > 0 ? event.data.accounts[0] : undefined;

      const { currentAddress }: { currentAddress?: string } = yield select(
        (state: RootState) => {
          const { data } = getQuery<ISetAccountData | null>(state, {
            type: setAccount.toString(),
            action: setAccount,
          });

          return { currentAddress: data?.address };
        },
      );

      if (currentAddress?.toLowerCase() !== address?.toLowerCase()) {
        yield put(disconnect());
        yield put(connect());
      }
    }
  }
}

function* onDisconnectWallet() {
  const requestsToReset: string[] = [
    setAccount.toString(),
    fetchProfileInfo.toString(),
  ];

  if (featuresConfig.nftLikes) {
    requestsToReset.push(queryLikedItems.toString());
  }

  yield put(resetRequests(requestsToReset));
}

export function* connectSaga() {
  yield takeEvery(connect.toString(), onConnectWallet);
  yield takeEvery(disconnect.toString(), onDisconnectWallet);
}
