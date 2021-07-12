import { getQuery } from '@redux-requests/core';
import { eventChannel } from 'redux-saga';
import { put, select, take, takeEvery } from 'redux-saga/effects';
import { RootState } from 'store';
import {
  ISetAccountData,
  setAccount,
} from '../../account/store/actions/setAccount';
import { connectIsFinished } from '../../account/store/actions/connect';
import {
  BounceERC1155WithSign,
  BounceERC721WithSign,
} from '../../web3/contracts';
import {
  getBounceERC1155WithSign,
  getBounceERC721WithSign,
} from '../../createNFT/api/sign';
import { EventEmitter } from 'events';
import { updateNFTByEvent } from '../actions/updateNftByEvent';

enum ActionType {
  Fetched,
  Error,
}

export interface IEventFailed {
  type: ActionType.Error;
  error: { error: any; receipt: any };
}

export interface IEventFetched {
  type: ActionType.Fetched;
  data: any;
}

export type ProviderEvent = IEventFetched | IEventFailed;

const subscribe = (eventEmitter: EventEmitter, emitter: any) => {
  eventEmitter
    .on('data', (event: any) => {
      emitter({
        data: event,
        type: ActionType.Fetched,
      } as IEventFetched);
    })
    .on('error', (error: any, receipt: any) => {
      emitter({
        error: { error, receipt },
        type: ActionType.Error,
      } as IEventFailed);
    });
};

function createEventChannel(accountData: ISetAccountData) {
  const { web3, address, chainId } = accountData;
  const options = {
    filter: {
      to: address,
    },
    fromBlock: 'pending',
  };

  const ContractBounceERC721WithSign = new web3.eth.Contract(
    BounceERC721WithSign,
    getBounceERC721WithSign(chainId),
  );

  const ContractBounceERC1155WithSign = new web3.eth.Contract(
    BounceERC1155WithSign,
    getBounceERC1155WithSign(chainId),
  );

  return eventChannel(emitter => {
    const transferEventEmitterERC721 = ContractBounceERC721WithSign.events.Transfer(
      options,
    );
    const transferSinglEventEmitterERC1155 = ContractBounceERC1155WithSign.events.TransferSingle(
      options,
    );
    const transferBatchEventEmitterERC1155 = ContractBounceERC1155WithSign.events.TransferBatch(
      options,
    );

    subscribe(transferEventEmitterERC721, emitter);
    subscribe(transferSinglEventEmitterERC1155, emitter);
    subscribe(transferBatchEventEmitterERC1155, emitter);

    return () => {
      transferEventEmitterERC721.unsubscribe();
      transferSinglEventEmitterERC1155.unsubscribe();
      transferBatchEventEmitterERC1155.unsubscribe();
    };
  });
}

function* onConnectWallet() {
  const accountData: ISetAccountData = yield select(
    (state: RootState): ISetAccountData => {
      const { data } = getQuery<ISetAccountData>(state, {
        type: setAccount.toString(),
        action: setAccount,
      });

      return data;
    },
  );
  let latestBlock = 0;

  const channel = createEventChannel(accountData);

  while (true) {
    const event: ProviderEvent = yield take(channel);

    switch (event.type) {
      case ActionType.Error:
        break;
      case ActionType.Fetched:
        if (event.data.blockNumber > latestBlock) {
          const params = mapEventToAction(event.data);
          yield put(updateNFTByEvent(params));

          latestBlock = event.data.blockNumber;
        }
        break;
    }
  }
}

export function* profileUpdateSaga() {
  yield takeEvery(connectIsFinished.toString(), onConnectWallet);
}

const mapEventToAction = (event: any) => {
  const { address, transactionHash, returnValues } = event;
  const { to } = returnValues;
  return {
    address: to,
    id: +returnValues.tokenId || +returnValues.id,
    hash: transactionHash,
    contractAddress: address,
  };
};
