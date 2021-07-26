import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { IItem } from '../api/getItems';
import { fetchItemsByIds } from './fetchItemsByIds';
import { fetchPoolDetails, isEnglishAuction } from './fetchPoolDetails';
import { fetchPoolsWeight } from './fetchPoolsWeight';

interface IOverviewItem extends IItem {
  poolWeight: number;
}

export const fetchOverview = createSmartAction<RequestAction<IItem[], IItem[]>>(
  'fetchOverview',
  () => {
    return {
      request: {
        promise: (async function () {})(),
      },
      meta: {
        asQuery: true,
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

              if (poolsInfoData?.list.length === 0) return [];

              const poolWidthMap = new Map<number, number>([]);
              const poolDetailsList = await Promise.all(
                poolsInfoData.list?.map(item => {
                  poolWidthMap.set(item.poolId, item.poolWeight);

                  return store.dispatchRequest(
                    fetchPoolDetails(
                      {
                        poolId: item.poolId,
                        poolType: item.auctionType,
                      },
                      { requestKey: item.poolId },
                      { silent: true },
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

              const overviewItems = data
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
                    poolType: pool?.auctionType,
                    closeAt:
                      pool && isEnglishAuction(pool) ? pool.closeAt : undefined,
                    poolWeight: poolWidthMap.get(pool?.poolId as number) || 0,
                    avatar: pool?.avatar,
                    ownerName: pool?.createName,
                    openAt: pool?.openAt,
                  } as IOverviewItem;
                })
                .filter(item => item.poolId)
                .sort((a, b) => {
                  return b.poolWeight - a.poolWeight;
                });
              return overviewItems;
            })(),
          };
        },
      },
    };
  },
);
