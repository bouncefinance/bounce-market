import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { setAccount } from '../../account/store/actions/setAccount';
import {
  BounceBlindBox
} from '../../web3/contracts';

interface IBuyBlindBoxPayload {
  price: BigNumber
  count: number
}

export const buyBlindBox = createSmartAction<
  RequestAction<any, any>,
  [IBuyBlindBoxPayload]
>(
  'buyBlindBox',
  ({
    price,
    count
  }) => {
    return {
      request: {
        promise: (async function () { })(),
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
                data: { address, web3 },
              } = getQuery(store.getState(), {
                type: setAccount.toString(),
                action: setAccount,
              });

              const BounceBlindBox_CT = new web3.eth.Contract(
                BounceBlindBox,
                '0x6871103DBeC1b957C63a1E4943B18f763d582406',
              );

              BounceBlindBox_CT.methods
                .mintByETH(count)
                // Apply precise
                .send({
                  from: address,
                  value: web3.utils.toWei(price.multipliedBy(count).toString()),
                })
                .on('transactionHash', (hash: string) => {
                  // Pending status
                })
                .on('receipt', async (receipt: TransactionReceipt) => {
                  // resolve(receipt);
                  return Promise.resolve(receipt)
                })
                .on('error', (error: Error) => {
                  // reject(error);
                  return Promise.reject(error)
                });
            })(),
          };
        },
        asMutation: true,
      },
    };
  },
);
