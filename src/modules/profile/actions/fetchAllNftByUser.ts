import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { fetchItemsByFilter } from '../../createNFT/actions/fetchItemsByFilter';
import { fetchNftByUser } from '../../createNFT/actions/fetchNftByUser';
import { IItem } from '../../overview/api/getItems';
import { getPoolsByFilter } from '../api/getPoolsByFilter';
import { isEnglishAuction } from '../../overview/actions/fetchPoolDetails';
import { AuctionType } from '../../overview/api/auctionType';

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
              ...(fetchNftByUserData?.nfts721.map(item => item.tokenId) ?? []),
              ...(fetchNftByUserData?.nfts1155.map(item => item.tokenId) ?? []),
              ...(pools?.list.map(item => item.tokenId) ?? []),
            ];
            const cts = [
              ...(fetchNftByUserData?.nfts721.map(
                item => item.contractAddress,
              ) ?? []),
              ...(fetchNftByUserData?.nfts1155.map(
                item => item.contractAddress,
              ) ?? []),
              ...(pools?.list.map(item => item.tokenContract) ?? []),
            ];

            const {
              data,
              error: fetchItemsError,
            } = await store.dispatchRequest(
              fetchItemsByFilter(
                { ids, cts },
                {
                  silent: true,
                  suppressErrorNotification: true,
                  requestKey: action.type,
                },
              ),
            );

            if (fetchItemsError) {
              throw fetchItemsError;
            }

            // TODO: How to manage pools, separated data or inline?
            return data
              ?.map(item => {
                const pool = pools?.list.find(pool => pool.tokenId === item.id);
                if (pool) {
                  return {
                    ...item,
                    poolId: pool.poolId,
                    poolType: isEnglishAuction(pool)
                      ? AuctionType.EnglishAuction
                      : AuctionType.FixedSwap,
                    price: isEnglishAuction(pool)
                      ? pool.lastestBidAmount
                      : pool.price,
                  };
                }

                return item;
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
