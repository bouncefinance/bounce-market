import { createAction as createSmartAction } from 'redux-smart-actions';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from '../../../store/store';
import { setAccount } from '../../account/store/actions/setAccount';
import BounceERC20 from '../contracts/BounceERC20.json';
import { ZERO_ADDRESS } from '../../common/conts';
import { NftType } from '../../createNFT/actions/createNft';
import BounceFixedSwapNFT from '../../createNFT/contracts/BounceFixedSwapNFT.json';
import { AbiItem } from 'web3-utils';
import { getFixedSwapContract } from '../../createNFT/actions/publishNft';
import { Address } from '../../common/types/unit';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import Web3 from 'web3';

interface IBidAuctionPayload {
  nftType: NftType;
  unitContract: Address;
  amountTotal1: BigNumber;
  poolId: number;
  amountTotal0: BigNumber;
  amount: BigNumber;
}

export const buyNow = createSmartAction<
  RequestAction<any, any>,
  [IBidAuctionPayload]
>(
  'buyNow',
  ({ nftType, unitContract, amountTotal1, poolId, amountTotal0, amount }) => {
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
                (BounceERC20.abi as unknown) as AbiItem,
                unitContract,
              );

              if (nftType === NftType.ERC721) {
                const BounceFixedSwapNFT_CT = new web3.eth.Contract(
                  (BounceFixedSwapNFT.abi as unknown) as AbiItem,
                  getFixedSwapContract(chainId),
                );

                const bid = (value?: string) =>
                  new Promise((resolve, reject) =>
                    BounceFixedSwapNFT_CT.methods
                      .swap(poolId, amountTotal0)
                      .send({ from: address, value })
                      .on('transactionHash', (hash: string) => {
                        // Pending status
                      })
                      .on('receipt', async (receipt: TransactionReceipt) => {
                        resolve(receipt);
                      })
                      .on('error', (error: Error) => {
                        reject(error);
                      }),
                  );

                if (unitContract === ZERO_ADDRESS) {
                  await bid(amountTotal1.toString());
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
                }

                await bid();
              } else {
                const BounceFixedSwapNFT_CT = new web3.eth.Contract(
                  (BounceFixedSwapNFT.abi as unknown) as AbiItem,
                  getFixedSwapContract(chainId),
                );

                const _amount0 = amount;
                const _amount1 = Web3.utils.toWei(
                  amountTotal1
                    .div(amountTotal0)
                    .multipliedBy(amount)
                    .toString(),
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
                }

                await bid();
              }
            })(),
          };
        },
        asMutation: true,
      },
    };
  },
);
