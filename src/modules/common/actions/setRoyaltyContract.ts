// import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { DispatchRequest, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
// import { NftType } from 'modules/api/common/NftType';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
// import { BounceErc1155, BounceErc721 } from '../../web3/contracts';
import { throwIfDataIsEmptyOrError } from '../utils/throwIfDataIsEmptyOrError';
import { getRoyaltySign, IRoyaltyload } from './getRoyaltySign';

export const setRoyaltyContract = createSmartAction<RequestAction<void, void>>(
  'setRoyaltyContract',
  ({
    rate,
    receiverAddress,
    collection,
  }: {
    rate: BigNumber;
    receiverAddress: string;
    collection: string;
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
            console.log(rate);
            const royaltyPayload: IRoyaltyload = {
              _royaltyRatio: rate.toNumber(),
              _royaltyReceiver: receiverAddress,
              collection: collection,
            };

            const { data: poyaltyData } = throwIfDataIsEmptyOrError(
              await store.dispatchRequest(getRoyaltySign(royaltyPayload)),
            );

            console.log(poyaltyData);

            // const {
            //   data: { address, chainId, web3 },
            // } = getQuery(store.getState(), {
            //   type: setAccount.toString(),
            //   action: setAccount,
            // })

            // const contract1155 = new web3.eth.Contract(
            //   BounceErc1155,
            //   contractAddress,
            // );

            // return await new Promise((resolve, reject) => {
            //   contract721.methods
            //     .burn(tokenId)
            //     .send({ from: address })
            //     .on('transactionHash', (hash: string) => {
            //       // Pending status
            //     })
            //     .on('receipt', async (receipt: TransactionReceipt) => {
            //       setTimeout(() => {
            //         resolve(receipt);
            //       }, 15000);
            //     })
            //     .on('error', (error: Error) => {
            //       reject(error);
            //     });
            // });
          })(),
        };
      },
    },
  }),
);
