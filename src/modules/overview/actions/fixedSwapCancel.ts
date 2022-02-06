import { createAction as createSmartAction } from 'redux-smart-actions';
import {
  DispatchRequest,
  getQuery,
  RequestAction,
  RequestActionMeta,
} from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from '../../../store';
import { setAccount } from '../../account/store/actions/setAccount';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { AuctionType } from 'modules/api/common/auctionType';
import {
  getPoolAddress,
  getPoolContract,
} from 'modules/common/hooks/contractHelps';
import { tokenUnfrozen } from 'modules/common/actions/frozen';

interface ICancelParams {
  poolId: string;
  poolType: AuctionType;
  tokenId: string;
}

export const fixedSwapCancel = createSmartAction<RequestAction<void, void>>(
  'fixedSwapCancel',
  (
    { poolId, poolType, tokenId }: ICancelParams,
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

            const contract = new web3.eth.Contract(
              getPoolContract(poolType),
              getPoolAddress({ poolType, chainId }),
            );
            const unfrozen = async () => {
              store.dispatchRequest(
                tokenUnfrozen({
                  address,
                  // TODO
                  token_type: '',
                  token_id: tokenId + '',
                }),
              );
            }

            await new Promise((resolve, reject) => {
              contract.methods
                .cancel(poolId)
                .send({ from: address })
                .on('transactionHash', (hash: string) => {
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
