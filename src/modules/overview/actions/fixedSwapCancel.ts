import { createAction as createSmartAction } from 'redux-smart-actions';
import {
  DispatchRequest,
  getQuery,
  RequestAction,
  RequestActionMeta,
} from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from '../../../store';
import { BounceFixedSwapNFT } from '../../web3/contracts';
import { getFixedSwapContract } from '../../createNFT/actions/publishNft';
import { setAccount } from '../../account/store/actions/setAccount';
import { TransactionReceipt } from '@ethersproject/abstract-provider';

interface ICancelParams {
  poolId: string;
}

export const fixedSwapCancel = createSmartAction<RequestAction<void, void>>(
  'fixedSwapCancel',
  ({ poolId }: ICancelParams, meta?: RequestActionMeta<void, void>) => ({
    request: {
      promise: (async function () {})(),
    },
    meta: {
      onRequest: (
        request: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: (async function () {
            const {
              data: { chainId, address, web3 },
            } = getQuery(store.getState(), {
              type: setAccount.toString(),
              action: setAccount,
            });

            const BounceFixedSwapNFT_CT = new web3.eth.Contract(
              BounceFixedSwapNFT,
              getFixedSwapContract(chainId),
            );

            await new Promise((resolve, reject) => {
              BounceFixedSwapNFT_CT.methods
                .cancel(poolId)
                .send({ from: address })
                .on('transactionHash', (hash: string) => {
                  // Pending
                })
                .on('receipt', async (receipt: TransactionReceipt) => {
                  resolve(receipt);
                })
                .on('error', (error: Error) => {
                  reject(error);
                });
            });
          })(),
        };
      },
      asMutation: true,
      ...meta,
    },
  }),
);
