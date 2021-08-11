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
import {
  fetchPoolDetails,
  IEnglishAuctionDetails,
  IFixedAuctionDetails,
  isEnglishAuction,
} from './fetchPoolDetails';
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
  quantity: number;
  swappedAmount0: number;
  identity: number;
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
              const poolDetailsList = await (
                await Promise.all(
                  poolsInfoData.list.map(async item => {
                    poolWidthMap.set(item.poolId, item.poolWeight);

                    const poolDetail = await store.dispatchRequest(
                      fetchPoolDetails(
                        {
                          poolId: item.poolId,
                          poolType: item.auctionType,
                        },
                        { requestKey: item.poolId },
                        { silent: true },
                      ),
                    );
                    return poolDetail?.data || null;
                  }),
                )
              ).filter(i => i);

              const {
                data: itemDataList = [],
                error: fetchItemError,
              } = await store.dispatchRequest(
                fetchItemsByFilter(
                  poolDetailsList.reduce(
                    (acc: { ids: number[]; cts: string[] }, current) => {
                      if (!current) {
                        return { ...acc, channel: ItemsChannel.all };
                      }

                      return {
                        ids: [...acc.ids, current.tokenId],
                        cts: [...acc.cts, current.tokenContract],
                        channel: ItemsChannel.all,
                      };
                    },
                    { ids: [], cts: [], channel: ItemsChannel.all },
                  ),
                ),
              );
              if (fetchItemError) {
                return [];
              }

              const overviewItems: (IOverviewItem | null)[] = (
                poolDetailsList ?? []
              )
                ?.map(poolItem => {
                  if (!poolItem) return null;
                  const nftItem = itemDataList.find(nftItem => {
                    return (
                      poolItem?.tokenId === nftItem.id &&
                      String(poolItem?.tokenContract).toLowerCase() ===
                        String(nftItem.contractaddress).toLowerCase()
                    );
                  }) as IItemByFilter;

                  let price = new BigNumber(0);
                  let quantity = 0;

                  if (
                    poolItem?.auctionType === AuctionType.EnglishAuction ||
                    poolItem?.auctionType === AuctionType.EnglishAuction_Timing
                  ) {
                    price =
                      (poolItem as IEnglishAuctionDetails).lastestBidAmount.toString() !==
                      '0'
                        ? (poolItem as IEnglishAuctionDetails).lastestBidAmount
                        : (poolItem as IEnglishAuctionDetails).amountMin1 ||
                          new BigNumber(0);

                    quantity = (poolItem as IEnglishAuctionDetails)
                      .tokenAmount0;
                    // sold = (poolItem as IEnglishAuctionDetails)
                  } else {
                    price =
                      (poolItem as IFixedAuctionDetails).price ||
                      new BigNumber(0);
                    quantity = (poolItem as IFixedAuctionDetails).quantity;
                  }
                  return {
                    ...nftItem,
                    price,
                    poolId: poolItem?.poolId,
                    poolType: poolItem?.auctionType,
                    closeAt:
                      poolItem && isEnglishAuction(poolItem)
                        ? poolItem.closeAt
                        : undefined,
                    poolWeight:
                      poolWidthMap.get(poolItem?.poolId as number) || 0,
                    avatar: poolItem?.avatar,
                    ownerName: poolItem?.createName,
                    openAt: poolItem?.openAt,
                    isLike: poolItem?.isLike ?? false,
                    likeCount: poolItem?.likeCount ?? 0,
                    itemName: nftItem?.itemname,
                    fileUrl: nftItem?.fileurl,
                    ownerAddress: poolItem?.creator || '',
                    quantity,
                    swappedAmount0: poolItem?.swappedAmount0 || 0,
                    identity: poolItem?.identity || 1,
                  };
                })
                .filter(item => item?.poolId)
                .sort((a, b) => {
                  return (b?.poolWeight || 1) - (a?.poolWeight || 1);
                });
              return overviewItems;
            })(),
          };
        },
      },
    };
  },
);
