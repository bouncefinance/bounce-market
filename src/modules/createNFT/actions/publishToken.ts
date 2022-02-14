import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { ApeSwap, BounceERC20 } from 'modules/web3/contracts';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';

export const publishToken = createSmartAction<
  RequestAction<null, null>,
  [
    {
      contract: string;
      tokenB: string;
      apeSwapContract: string;
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
    tokenB,
    apeSwapContract,
    web3,
    walletAddress: address,
    amount,
    uintPrice,
    decimals,
  }) => {
    return {
      request: {
        async promise() { },
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
                apeSwapContract,
              );
              try {
                return await new Promise(async (resolve, reject) => {
                  try {
                    const BounceERC20_CT = new web3.eth.Contract(
                      BounceERC20,
                      contractAddress,
                    );
                    const totalAmountA = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals))
                    const totalAmountB = totalAmountA.multipliedBy(uintPrice)
                    const allowance = await BounceERC20_CT.methods
                      .allowance(address, apeSwapContract)
                      .call();
                    if (
                      new BigNumber(allowance)
                        .dividedBy(totalAmountA)
                        .isLessThan(1)
                    ) {
                      const approveRes = await BounceERC20_CT.methods
                        .approve(apeSwapContract, totalAmountA.toString())
                        .send({ from: address })
                      if (!approveRes) {
                        throw new Error('TODO Error description');
                      }
                    }
                    ApeSwapContract.methods
                      .create(
                        [
                          "_",
                          contractAddress,// TokenA: FT contract
                          tokenB,
                          totalAmountA.toFixed(), // sale FT number
                          totalAmountB.toFixed(), // total price
                          1,
                        ]
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
                  } catch (error) {
                    console.log('create error', error)
                    reject(error)
                  }
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
