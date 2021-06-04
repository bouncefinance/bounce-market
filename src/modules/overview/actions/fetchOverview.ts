import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { AuctionType } from '../api/auctionType';
import { IItem } from '../api/getItems';
import { fetchItemsByIds } from './fetchItemsByIds';
import { fetchPoolDetails, isEnglishAuction } from './fetchPoolDetails';
import { fetchPoolsWeight } from './fetchPoolsWeight';

export const fetchOverview = createSmartAction<RequestAction<IItem[], IItem[]>>(
  'fetchOverview',
  () => {
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
                data: poolsInfoData,
                error: poolsInfoError,
              } = await store.dispatchRequest(
                fetchPoolsWeight(
                  { limit: 11, offset: 0, orderweight: 1 },
                  { silent: true },
                ),
              );
              if (poolsInfoError || !poolsInfoData) {
                throw poolsInfoError;
              }

              const poolWidthMap = new Map<number, number>([]);
              const poolDetailsList = await Promise.all(
                poolsInfoData.list.map(item => {
                  poolWidthMap.set(item.poolId, item.poolWeight);

                  return store.dispatchRequest(
                    fetchPoolDetails(
                      {
                        poolId: item.poolId,
                        poolType: item.auctionType,
                      },
                      { requestKey: item.poolId },
                    ),
                  );
                }),
              );

              const { data } = await store.dispatchRequest(
                fetchItemsByIds(
                  poolDetailsList.reduce(
                    (acc: { ids: number[]; cts: string[] }, current) => {
                      if (!current.data) {
                        return acc;
                      }

                      return {
                        ids: [...acc.ids, current.data.tokenId],
                        cts: [...acc.cts, current.data.tokenContract],
                      };
                    },
                    { ids: [], cts: [] },
                  ),
                ),
              );

              interface dataType extends IItem {
                poolWight: number;
              }

              return data
                ?.map(item => {
                  const pool = poolDetailsList.find(pool => {
                    return (
                      pool.data?.tokenId === item.id &&
                      String(pool.data?.tokenContract).toLowerCase() ===
                        String(item.contractAddress).toLowerCase()
                    );
                  })?.data;

                  const price =
                    pool && isEnglishAuction(pool)
                      ? pool.lastestBidAmount.toString() !== '0'
                        ? pool.lastestBidAmount
                        : pool.amountMin1
                      : pool?.price || item.price;

                  return {
                    ...item,
                    price,
                    poolId: pool?.poolId,
                    poolType:
                      pool && isEnglishAuction(pool)
                        ? AuctionType.EnglishAuction
                        : AuctionType.FixedSwap,
                    closeAt:
                      pool && isEnglishAuction(pool) ? pool.closeAt : undefined,
                    poolWight: poolWidthMap.get(pool?.poolId as number) || 0,
                  } as dataType;
                })
                .sort((a, b) => {
                  // debugger
                  return b.poolWight - a.poolWight;
                });
            })(),
          };
        },
        asQuery: true,
      },
    };
  },
);
