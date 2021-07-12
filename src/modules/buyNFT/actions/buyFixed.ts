import { createAction as createSmartAction } from 'redux-smart-actions';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from 'store';
import { setAccount } from '../../account/store/actions/setAccount';
import { ZERO_ADDRESS } from '../../common/conts';
import { getFixedSwapContract } from '../../createNFT/actions/publishNft';
import { Address } from '../../common/types/unit';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import Web3 from 'web3';
import { BounceERC20, BounceFixedSwapNFT } from '../../web3/contracts';
import { NftType } from '../../common/const/NftType';

interface IBuyFixedPayload {
  nftType: NftType;
  unitContract: Address;
  amountTotal0: number;
  amountTotal1: BigNumber;
  poolId: number;
  quantity: number;
}

export const buyFixed = createSmartAction<
  RequestAction<any, any>,
  [IBuyFixedPayload]
>(
  'buyFixed',
  ({ nftType, unitContract, amountTotal1, poolId, amountTotal0, quantity }) => {
    return {
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

              const BounceERC20_CT = new web3.eth.Contract(
                BounceERC20,
                unitContract,
              );

              if (nftType === NftType.ERC721) {
                const BounceFixedSwapNFT_CT = new web3.eth.Contract(
                  BounceFixedSwapNFT,
                  getFixedSwapContract(chainId),
                );

                const buy = (value?: string) => {
                  return new Promise((resolve, reject) => {
                    BounceFixedSwapNFT_CT.methods
                      .swap(poolId, amountTotal0)
                      // Apply precise
                      .send({
                        from: address,
                        value: value ? web3.utils.toWei(value) : undefined,
                      })
                      .on('transactionHash', (hash: string) => {
                        // Pending status
                      })
                      .on('receipt', async (receipt: TransactionReceipt) => {
                        resolve(receipt);
                      })
                      .on('error', (error: Error) => {
                        reject(error);
                      });
                  });
                };

                if (unitContract === ZERO_ADDRESS) {
                  await buy(amountTotal1.toFixed());
                } else {
                  const allowance = await BounceERC20_CT.methods
                    .allowance(address, getFixedSwapContract(chainId))
                    .call();

                  if (
                    new BigNumber(allowance)
                      .dividedBy(amountTotal1)
                      .isLessThan(1)
                  ) {
                    const approveRes = await BounceERC20_CT.methods
                      .approve(
                        getFixedSwapContract(chainId),
                        '0xffffffffffffffff',
                      )
                      .send({ from: address });

                    if (!approveRes) {
                      throw new Error('TODO Error description');
                    }
                  }

                  await buy();
                }
              } else {
                const BounceFixedSwapNFT_CT = new web3.eth.Contract(
                  BounceFixedSwapNFT,
                  getFixedSwapContract(chainId),
                );
                const _amount0 = quantity;
                const _amount1 = Web3.utils.toWei(
                  amountTotal1
                    .div(amountTotal0)
                    .multipliedBy(quantity)
                    .toFixed(),
                );

                const bid = (value?: string) =>
                  new Promise((resolve, reject) => {
                    BounceFixedSwapNFT_CT.methods
                      .swap(poolId, _amount0)
                      .send({ from: address, value })
                      .on('transactionHash', (hash: string) => {
                        // Pending status
                      })
                      .on('receipt', async (receipt: TransactionReceipt) => {
                        resolve(receipt);
                      })
                      .on('error', (error: Error) => {
                        reject(error);
                      });
                  });

                if (unitContract === ZERO_ADDRESS) {
                  await bid(_amount1);
                } else {
                  const allowance = await BounceERC20_CT.methods
                    .allowance(address, getFixedSwapContract(chainId))
                    .call();

                  if (
                    new BigNumber(allowance)
                      .dividedBy(amountTotal1)
                      .isLessThan(1)
                  ) {
                    const approveRes = await BounceERC20_CT.methods
                      .approve(
                        getFixedSwapContract(chainId),
                        '0xffffffffffffffff',
                      )
                      .send({ from: address });

                    if (!approveRes) {
                      throw new Error('TODO Error description');
                    }
                  }

                  await bid();
                }
              }
            })(),
          };
        },
        asMutation: true,
      },
    };
  },
);
