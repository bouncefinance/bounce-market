import { createAction as createSmartAction } from 'redux-smart-actions';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from 'store';
import { setAccount } from '../../account/store/actions/setAccount';
import { ZERO_ADDRESS } from '../../common/conts';
import BigNumber from 'bignumber.js';
import { getEnglishAuctionContract } from '../../createNFT/actions/publishNft';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import {
  BounceEnglishAuctionNFT,
  BounceEnglishAuctionNFTTime,
  BounceERC20,
} from '../../web3/contracts';

interface IBidEnglishAuctionPayload {
  amount: BigNumber;
  unitContract: string;
  poolId: number;
  isOpenSaleTime: boolean;
}

export const bidEnglishAuction = createSmartAction<
  RequestAction<any, any>,
  [IBidEnglishAuctionPayload]
>('bidEnglishAuction', ({ amount, unitContract, poolId, isOpenSaleTime }) => {
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

            // TODO: Apply precise
            const amountValue = web3.utils.toWei(amount.toFixed());

            const BounceEnglishAuctionNFTContract = new web3.eth.Contract(
              isOpenSaleTime
                ? BounceEnglishAuctionNFTTime
                : BounceEnglishAuctionNFT,
              getEnglishAuctionContract(chainId, isOpenSaleTime),
            );

            const bid = (value?: string) =>
              new Promise((resolve, reject) => {
                BounceEnglishAuctionNFTContract.methods
                  .bid(poolId, amountValue)
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
              await bid(amountValue);
            } else {
              const BounceERC20Contract = new web3.eth.Contract(
                BounceERC20,
                unitContract,
              );

              const allowance = await BounceERC20Contract.methods
                .allowance(
                  address,
                  getEnglishAuctionContract(chainId, isOpenSaleTime),
                )
                .call();

              if (new BigNumber(allowance).dividedBy(amount).isLessThan(1)) {
                const approveRes = await BounceERC20Contract.methods
                  .approve(
                    getEnglishAuctionContract(chainId, isOpenSaleTime),
                    '0xffffffffffffffff',
                  )
                  .send({ from: address });

                if (!approveRes) {
                  throw new Error('TODO describe error');
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
});
