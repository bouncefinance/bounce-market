import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { setAccount } from 'modules/account/store/actions/setAccount';
import { BounceRoyalty } from 'modules/web3/contracts';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { getRoyaltySignContract } from '../../../../common/api/getContract';
import { throwIfDataIsEmptyOrError } from '../../../../common/utils/throwIfDataIsEmptyOrError';
import { getRoyaltySign, IRoyaltyload } from './getRoyaltySign';

export const setRoyaltyContract = createSmartAction<RequestAction<void, void>>(
  'setRoyaltyContract',
  ({
    rate,
    receiverAddress,
    collection,
    successCallBack,
    finalCallBack,
  }: {
    rate: BigNumber;
    receiverAddress: string;
    collection: string;
    successCallBack?: () => void;
    finalCallBack?: () => void;
  }) => ({
    request: {
      promise: (async function () {})(),
    },
    meta: {
      asMutation: true,
      onRequest: (
        request: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: (async function () {
            const royaltyPayload: IRoyaltyload = {
              _royaltyRatio: rate.toNumber(),
              _royaltyReceiver: receiverAddress,
              collection: collection,
            };

            const { data: poyaltyData } = throwIfDataIsEmptyOrError(
              await store.dispatchRequest(getRoyaltySign(royaltyPayload)),
            );

            const {
              data: { address, chainId, web3 },
            } = getQuery(store.getState(), {
              type: setAccount.toString(),
              action: setAccount,
            });

            const royalty_CT = new web3.eth.Contract(
              BounceRoyalty,
              getRoyaltySignContract(chainId),
            );

            const _collection = collection;
            const _royaltyReceiver = receiverAddress;
            const _royaltyRatio = web3.utils.toWei(rate.toString(), 'ether');
            const _expireTime = poyaltyData.expireTime;
            const _sign = poyaltyData.sign;

            return await new Promise((resolve, reject) => {
              royalty_CT.methods
                .setCollectionConfig(
                  _collection,
                  _royaltyReceiver,
                  _royaltyRatio,
                  _expireTime,
                  _sign,
                )
                .send({ from: address })
                .on('transactionHash', (hash: string) => {
                  // Pending status
                })
                .on('receipt', async (receipt: TransactionReceipt) => {
                  successCallBack && successCallBack();
                  finalCallBack && finalCallBack();
                  setTimeout(() => {
                    resolve(receipt);
                  }, 15000);
                })
                .on('error', (error: Error) => {
                  finalCallBack && finalCallBack();
                  reject(error);
                });
            });
          })(),
        };
      },
    },
  }),
);
