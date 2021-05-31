import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { fetchNftByUser } from '../../createNFT/actions/fetchNftByUser';
import { IItem } from '../../overview/api/getItems';
import { getPoolsByFilter } from '../api/getPoolsByFilter';
import { isEnglishAuction } from '../../overview/actions/fetchPoolDetails';
import { AuctionType } from '../../overview/api/auctionType';
import { fetchItem } from '../../buyNFT/actions/fetchItem';
import { AuctionState } from '../../common/const/AuctionState';
import { FixedSwapState } from '../../common/const/FixedSwapState';
import { throwIfError } from '../../common/utils/throwIfError';

export interface IApiFetchNftByUserVariables {
  user: string;
}

export const fetchAllNftByUser: (
  payload: IApiFetchNftByUserVariables,
) => RequestAction<IItem[], IItem[]> = createAction(
  'fetchAllNftByUser',
  (payload: IApiFetchNftByUserVariables) => ({
    request: {
      promise: (async function () {})(),
    },
    meta: {
      getData: data => data,
      onRequest: (
        request: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: (async function () {
            const { data: fetchNftByUserData } = throwIfError(
              await store.dispatchRequest(
                fetchNftByUser(
                  { userId: payload.user },
                  {
                    silent: true,
                    suppressErrorNotification: true,
                    requestKey: action.type,
                  },
                ),
              ),
            );

            const nfts = [
              ...(fetchNftByUserData?.nfts721 ?? []),
              ...(fetchNftByUserData?.nfts1155 ?? []),
            ];

            const { data: pools } = await store.dispatchRequest(
              getPoolsByFilter(payload),
            );

            // Filter out the pools that have been closed
            const poolsByStateFilterResult = {
              list: pools?.list.filter(item => item.state !== 1),
            };

            const ids = [
              ...(poolsByStateFilterResult?.list!.map(item => item.tokenId) ??
                []),
              ...(nfts.map(item => item.tokenId) ?? []),
            ];
            const cts = [
              ...(poolsByStateFilterResult?.list!.map(
                item => item.tokenContract,
              ) ?? []),
              ...(nfts.map(item => item.contractAddress) ?? []),
            ];

            const items = ids
              .map((id, index) => ({
                id,
                contractAddress: cts[index],
              }))
              .filter(item => item.id < 999999999);

            const data = (
              await Promise.all(
                items.map(item => {
                  return store.dispatchRequest(
                    fetchItem(
                      { id: item.id, contract: item.contractAddress },
                      {
                        silent: true,
                        suppressErrorNotification: true,
                        requestKey:
                          item.id + item.contractAddress + Math.random(),
                      },
                    ),
                  );
                }),
              )
            ).map(response => {
              return response.data!;
            });

            const poolsCopy = poolsByStateFilterResult
              ? [...poolsByStateFilterResult?.list!]
              : [];

            return (
              data
                ?.map(item => {
                  const poolIndex = poolsCopy.findIndex(
                    pool => pool.tokenId === item.id,
                  );
                  const pool = poolsCopy[poolIndex];

                  if (pool) {
                    // TODO: Ignore completed claimed auction?
                    poolsCopy.splice(poolIndex, 1);
                    return {
                      ...item,
                      supply: (() => {
                        if (isEnglishAuction(pool)) {
                          if (pool.state < AuctionState.Claimed) {
                            return pool.tokenAmount0;
                          }

                          return 0;
                        } else {
                          if (pool.state < FixedSwapState.Claimed) {
                            return pool.quantity;
                          } else {
                            return 0;
                          }
                        }
                      })(),
                      poolId: pool.poolId,
                      poolType: isEnglishAuction(pool)
                        ? AuctionType.EnglishAuction
                        : AuctionType.FixedSwap,
                      price: isEnglishAuction(pool)
                        ? pool.lastestBidAmount.isEqualTo(0)
                          ? pool.amountMin1
                          : pool.lastestBidAmount
                        : pool.price,
                      state: pool.state,
                    };
                  }

                  const supply = nfts.find(
                    nftItem => nftItem.tokenId === item.id,
                  )?.balance;

                  return { ...item, supply: supply ?? 0 };
                })
                // Meaningless NFT will be temporarily shielded to reduce interference
                .filter(
                  item =>
                    item.supply > 0 &&
                    item.itemname !== 'Untitled (External import)',
                )
                .sort((prev, next) => {
                  return next.createdAt.getTime() - prev.createdAt.getTime();
                })
            );
          })(),
        };
      },
    },
  }),
);
