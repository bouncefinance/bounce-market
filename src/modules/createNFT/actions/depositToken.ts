import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { BounceERC20 } from 'modules/web3/contracts';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';

export const depositToken = createSmartAction<
  RequestAction<null, null>,
  [
    {
      contract: string;
      web3: Web3;
      walletAddress: string;
      amount: string;
      decimals: string;
    },
  ]
>(
  'depositToken',
  ({
    contract: contractAddress,
    web3,
    walletAddress: address,
    amount,
    decimals,
  }) => {
    return {
      request: {
        async promise() {},
      },
      meta: {
        asMutation: true,
        onRequest() {
          return {
            promise: (async () => {
              console.log('contractAddress------>', contractAddress);
              if (!address) {
                return console.error('Invalid address');
              }
              const ERC20Contract = new web3.eth.Contract(
                BounceERC20,
                contractAddress,
              );
              try {
                return await new Promise((resolve, reject) => {
                  ERC20Contract.methods
                    .burn(
                      new BigNumber(amount).multipliedBy(
                        new BigNumber(10).pow(decimals),
                      ).toString(),
                    )
                    .send({ from: address })
                    .on('transactionHash', (hash: string) => {
                      // Pending status
                    })
                    .on('receipt', async (receipt: TransactionReceipt) => {
                      console.log('receipt---->', receipt);
                      resolve(receipt);
                    })
                    .on('error', (error: Error) => {
                      reject(error);
                    });
                });
              } catch (error) {
                throw new Error('');
              }
            })(),
          };
        },
      },
    };
  },
);
