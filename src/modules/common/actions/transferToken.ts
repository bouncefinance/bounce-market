import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { Store } from 'redux';
import { setAccount } from 'modules/account/store/actions/setAccount';
import {
  BounceErc721,
  BounceErc1155,
} from '../../web3/contracts';
import { NftType } from 'modules/createNFT/actions/createNft';
import { TransactionReceipt } from '@ethersproject/abstract-provider';

export const transferToken = createSmartAction(
  'transferToken',
  (contractAddress: string, standard: NftType, tokenId: number, toAddress: string,  quantity?: number) => ({
    request: {
      promise: (async function () { })(),
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
            const {
              data: { address, web3 },
            } = getQuery(store.getState(), {
              type: setAccount.toString(),
              action: setAccount
            });

            const contract721 = new web3.eth.Contract(
              BounceErc721,
              contractAddress
            )

            const contract1155 = new web3.eth.Contract(
              BounceErc1155,
              contractAddress,
            )
            
            if (standard === NftType.ERC721) {
              return await new Promise((resolve, reject) => {
                contract721.methods
                  .transferFrom(
                    address,
                    toAddress,
                    tokenId,
                  )
                  .send({ from: address })
                  .on('transactionHash', (hash: string) => {
                    // Pending status
                  })
                  .on('receipt', async (receipt: TransactionReceipt) => {
                    setTimeout(() => {
                      resolve(receipt);
                    }, 15000);
                  })
                  .on('error', (error: Error) => {
                    reject(error);
                  });
              })
            } else if (standard === NftType.ERC1155) {
              return await new Promise((resolve, reject) => {
                contract1155.methods
                  .safeTransferFrom(
                    address,
                    toAddress,
                    tokenId,
                    quantity,
                    "0x00",
                  )
                  .send({ from: address })
                  .on('transactionHash', (hash: string) => {
                    // Pending status
                  })
                  .on('receipt', async (receipt: TransactionReceipt) => {
                    setTimeout(() => {
                      resolve(receipt);
                    }, 15000);
                  })
                  .on('error', (error: Error) => {
                    reject(error);
                  });
              })
            }

          })(),
        };
      },
    },
  }),
);
