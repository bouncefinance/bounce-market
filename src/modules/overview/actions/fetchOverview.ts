import { DispatchRequest, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { AuctionType } from 'modules/api/common/auctionType';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { IItem } from '../api/getItems';
import {
  fetchItemsByFilter,
  IItemByFilter,
  ItemsChannel,
} from './fetchItemsByFilter';
import { fetchPoolDetails, isEnglishAuction } from './fetchPoolDetails';
import { fetchPoolsWeight } from './fetchPoolsWeight';

export interface IOverviewItem extends IItemByFilter {
  poolId?: number;
  poolType?: AuctionType;
  closeAt?: Date;
  openAt?: Date;
  ownerName?: string;
  avatar?: string;
  poolWeight: number;
  price: BigNumber;
  isLike: boolean;
  likeCount: number;
  itemName: string;
  fileUrl: string;
  ownerAddress: string;
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
                console.error('poolsInfoError', poolsInfoError);
                return [];
              }

              if (!poolsInfoData?.list?.length) return [];

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
                      { silent: true },
                    ),
                  );
                }),
              );

              const {
                data,
                error: fetchItemError,
              } = await store.dispatchRequest(
                fetchItemsByFilter(
                  poolDetailsList.reduce(
                    (acc: { ids: number[]; cts: string[] }, current) => {
                      if (!current.data) {
                        return { ...acc, channel: ItemsChannel.all };
                      }

                      return {
                        ids: [...acc.ids, current.data.tokenId],
                        cts: [...acc.cts, current.data.tokenContract],
                        channel: ItemsChannel.all,
                      };
                    },
                    { ids: [], cts: [], channel: ItemsChannel.all },
                  ),
                ),
              );
              if (fetchItemError) {
                console.log('fetchItemError', fetchItemError);
                return [];
              }

              const overviewItems: IOverviewItem[] = (data ?? [])
                ?.map(item => {
                  const pool = poolDetailsList.find(pool => {
                    return (
                      pool.data?.tokenId === item.id &&
                      String(pool.data?.tokenContract).toLowerCase() ===
                        String(item.contractaddress).toLowerCase()
                    );
                  })?.data;
                  const price =
                    pool && isEnglishAuction(pool)
                      ? pool.lastestBidAmount.toString() !== '0'
                        ? pool.lastestBidAmount
                        : pool.amountMin1
                      : pool?.price || new BigNumber(0);
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
                    isLike: pool?.isLike ?? false,
                    likeCount: pool?.likeCount ?? 0,
                    itemName: item.itemname,
                    fileUrl: item.fileurl,
                    ownerAddress: item.owneraddress,
                  };
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
