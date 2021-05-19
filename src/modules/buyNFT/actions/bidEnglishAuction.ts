import { createAction as createSmartAction } from 'redux-smart-actions';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from 'store';
import { setAccount } from '../../account/store/actions/setAccount';
import { ZERO_ADDRESS } from '../../common/conts';
import BigNumber from 'bignumber.js';
import { getEnglishAuctionContract } from '../../createNFT/actions/publishNft';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { BounceEnglishAuctionNFT, BounceERC20 } from '../../web3/contracts';

interface IBidEnglishAuctionPayload {
  amount: BigNumber;
  unitContract: string;
  amountTotal1?: BigNumber;
  poolId: number;
}

export const bidEnglishAuction = createSmartAction<
  RequestAction<any, any>,
  [IBidEnglishAuctionPayload]
>('bidEnglishAuction', ({ amount, unitContract, amountTotal1, poolId }) => {
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
            debugger;
            const {
              data: { chainId, address, web3 },
            } = getQuery(store.getState(), {
              type: setAccount.toString(),
              action: setAccount,
            });

            // TODO: Apply precise
            const amountValue = web3.utils.toWei(amount.toFixed());

            const BounceEnglishAuctionNFTContract = new web3.eth.Contract(
              BounceEnglishAuctionNFT,
              getEnglishAuctionContract(chainId),
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
                .allowance(address, getEnglishAuctionContract(chainId))
                .call();

              if (new BigNumber(allowance).dividedBy(amount).isLessThan(1)) {
                const approveRes = await BounceERC20Contract.methods
                  .approve(
                    getEnglishAuctionContract(chainId),
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
