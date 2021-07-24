import { createAction as createSmartAction } from 'redux-smart-actions';
import {
  DispatchRequest,
  getQuery,
  RequestAction,
  RequestActionMeta,
} from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from '../../../store';
import { BounceEnglishAuctionNFT } from '../../web3/contracts';
import { getEnglishAuctionContract } from '../../createNFT/actions/publishNft';
import { setAccount } from '../../account/store/actions/setAccount';
import { TransactionReceipt } from '@ethersproject/abstract-provider';

interface IClaimParams {
  poolId: string;
  isOpenSaleTime: boolean;
}

export const creatorClaim = createSmartAction<RequestAction<void, void>>(
  'creatorClaim',
  (
    { poolId, isOpenSaleTime }: IClaimParams,
    meta?: RequestActionMeta<void, void>,
  ) => ({
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

            const ContractBounceEnglishAuctionNFT = new web3.eth.Contract(
              BounceEnglishAuctionNFT,
              getEnglishAuctionContract(chainId, isOpenSaleTime),
            );

            await new Promise((resolve, reject) => {
              ContractBounceEnglishAuctionNFT.methods
                .creatorClaim(poolId)
                .send({ from: address })
                .on('transactionHash', () => {
                  // Pending
                })
                .on('receipt', async (receipt: TransactionReceipt) => {
                  resolve(receipt);
                })
                .on('error', (error: Error) => {
                  reject(error);
                });
            });
          })(),
        };
      },
      asMutation: true,
      ...meta,
    },
  }),
);
