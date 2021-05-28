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
import { getPublishedCount } from '../../createNFT/utils/getPublishedCount';

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
            const {
              data: fetchNftByUserData,
              error: fetchNftByUserError,
            } = await store.dispatchRequest(
              fetchNftByUser(
                { userId: payload.user },
                {
                  silent: true,
                  suppressErrorNotification: true,
                  requestKey: action.type,
                },
              ),
            );

            if (fetchNftByUserError) {
              throw fetchNftByUserError;
            }

            const { data: pools } = await store.dispatchRequest(
              getPoolsByFilter(payload),
            );

            const ids = [
              ...(pools?.list.map(item => item.tokenId) ?? []),
              ...(fetchNftByUserData?.nfts721.map(item => item.tokenId) ?? []),
              ...(fetchNftByUserData?.nfts1155.map(item => item.tokenId) ?? []),
            ];
            const cts = [
              ...(pools?.list.map(item => item.tokenContract) ?? []),
              ...(fetchNftByUserData?.nfts721.map(
                item => item.contractAddress,
              ) ?? []),
              ...(fetchNftByUserData?.nfts1155.map(
                item => item.contractAddress,
              ) ?? []),
            ];

            const items = ids.map((id, index) => ({
              id,
              contractAddress: cts[index],
            }));

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

            const poolsCopy = pools ? [...pools.list] : [];

            return data
              ?.map(item => {
                const poolIndex = poolsCopy.findIndex(
                  pool => pool.tokenId === item.id,
                );
                const pool = poolsCopy[poolIndex];

                if (pool) {
                  poolsCopy.splice(poolIndex, 1);
                  return {
                    ...item,
                    supply: isEnglishAuction(pool)
                      ? pool.tokenAmount0
                      : pool.quantity,
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

                const publishedCount = getPublishedCount(
                  pools?.list ?? [],
                  item.id,
                );

                return { ...item, supply: item.supply - publishedCount };
              })
              .sort((prev, next) => {
                return next.createdAt.getTime() - prev.createdAt.getTime();
              });
          })(),
        };
      },
    },
  }),
);
