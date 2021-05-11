import { createAction as createSmartAction } from 'redux-smart-actions';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from '../../../store/store';
import { setAccount } from '../../account/store/actions/setAccount';
import BounceEnglishAuctionNFT from '../../createNFT/contracts/BounceEnglishAuctionNFT.json';
import { AbiItem } from 'web3-utils';
import BounceERC20 from '../contracts/BounceERC20.json';
import { ZERO_ADDRESS } from '../../common/conts';
import BigNumber from 'bignumber.js';
import { getEnglishAuctionNFT } from '../../createNFT/actions/publishNft';
import { TransactionReceipt } from '@ethersproject/abstract-provider';

interface IBidEnglishAuctionPayload {
  amountMax1: BigNumber;
  bidPrice: BigNumber;
  unitContract: string;
  amountTotal1: BigNumber;
  poolId: number;
}

export const bidEnglishAuction = createSmartAction<
  RequestAction<any, any>,
  [IBidEnglishAuctionPayload]
>(
  'bidEnglishAuction',
  ({ amountMax1, bidPrice, unitContract, amountTotal1, poolId }) => {
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

              const BounceEnglishAuctionNFTContract = new web3.eth.Contract(
                (BounceEnglishAuctionNFT as unknown) as AbiItem,
              );
              const amount =
                amountMax1.toString() || web3.utils.toWei(bidPrice.toString());

              const bid = (value?: string) =>
                new Promise((resolve, reject) => {
                  BounceEnglishAuctionNFTContract.methods
                    .bid(poolId, amount)
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
                bid(amount);
              } else {
                const BounceERC20Contract = new web3.eth.Contract(
                  (BounceERC20.abi as unknown) as AbiItem,
                  unitContract,
                );

                const allowance = await BounceERC20Contract.methods
                  .allowance(address, getEnglishAuctionNFT(chainId))
                  .call();

                if (
                  new BigNumber(allowance).dividedBy(amountTotal1).isLessThan(1)
                ) {
                  const approveRes = await BounceERC20Contract.methods
                    .approve(
                      getEnglishAuctionNFT(chainId),
                      '0xffffffffffffffff',
                    )
                    .send({ from: address });

                  if (!approveRes) {
                    throw new Error('TODO describe error');
                  }
                }
              }

              bid();
            })(),
          };
        },
        asMutation: true,
      },
    };
  },
);
