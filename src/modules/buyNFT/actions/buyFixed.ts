import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { NftType } from 'modules/api/common/NftType';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import Web3 from 'web3';
import { setAccount } from '../../account/store/actions/setAccount';
import { ZERO_ADDRESS } from '../../common/conts';
import { Address } from '../../common/types/unit';
import { getFixedSwapContract } from '../../createNFT/actions/publishNft';
import {
  BounceERC20,
  BounceFixedSwapNFT,
  BounceFixedSwapNFTTime,
} from '../../web3/contracts';

interface IBuyFixedPayload {
  nftType: NftType;
  unitContract: Address;
  amountTotal0: number;
  amountTotal1: BigNumber;
  poolId: number;
  quantity: number;
  isOpenSaleTime: boolean;
}

export const buyFixed = createSmartAction<
  RequestAction<any, any>,
  [IBuyFixedPayload]
>(
  'buyFixed',
  ({
    nftType,
    unitContract,
    amountTotal1,
    poolId,
    amountTotal0,
    quantity,
    isOpenSaleTime,
  }) => {
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
              const fixedSwapContract = getFixedSwapContract(
                chainId,
                isOpenSaleTime,
              );
              const BounceFixedSwapNFT_CT = new web3.eth.Contract(
                isOpenSaleTime ? BounceFixedSwapNFTTime : BounceFixedSwapNFT,
                fixedSwapContract,
              );
              if (nftType === NftType.ERC721) {
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
                    .allowance(address, fixedSwapContract)
                    .call();
                  console.log(BigNumber, allowance, amountTotal1)
                  if (
                    new BigNumber(allowance)
                      // .dividedBy(amountTotal1)
                      // .isLessThan(1)
                      .isLessThan(amountTotal1.multipliedBy(1e18))
                  ) {
                    console.log('---approve--')
                    console.log('---approve arg--', amountTotal1.multipliedBy(1e18), address)
                    const approveRes = await BounceERC20_CT.methods
                      .approve(fixedSwapContract, amountTotal1.multipliedBy(1e18).toString())
                      .send({ from: address });

                      console.log('---approve end--')
                    if (!approveRes) {
                      throw new Error('TODO Error description');
                    }
                  }

                  await buy();
                }
              } else {
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
                    .allowance(address, fixedSwapContract)
                    .call();

                  if (
                    new BigNumber(allowance)
                      .dividedBy(amountTotal1)
                      .isLessThan(1)
                  ) {
                    const approveRes = await BounceERC20_CT.methods
                      .approve(fixedSwapContract, '0xffffffffffffffff')
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
