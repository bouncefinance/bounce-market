import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { RequestAction } from '@redux-requests/core';
import { getApeContract, getApeSwapContract } from 'modules/common/hooks/contractHelps';
import { ApeSwap } from 'modules/web3/contracts';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';

export const publishToken = createSmartAction<
  RequestAction<null, null>,
  [
    {
      contract: string;
      web3: Web3;
      walletAddress: string;
      amount: string;
      uintPrice: string;
      decimals: string;
    },
  ]
>(
  'publishToken',
  ({
    contract: contractAddress,
    web3,
    walletAddress: address,
    amount,
    uintPrice,
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
              const ApeSwapContract = new web3.eth.Contract(
                ApeSwap,
                getApeSwapContract(0),
              );
              try {
                return await new Promise((resolve, reject) => {
                  ApeSwapContract.methods
                    .create(
                      "",
                      contractAddress,//tokenA就是FT的地址
                      getApeContract(0),
                      amount, // 就是我要出售多少个FT
                      Number(amount) * Number(uintPrice), // totalAmount B就是FT我要卖的总价
                      1,
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
