import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { AuctionState } from '../../api/common/AuctionState';
import { AuctionType } from '../../api/common/auctionType';
import { FixedSwapState } from '../../api/common/FixedSwapState';
import { fetchItem } from '../../buyNFT/actions/fetchItem';
import {
  IEnglishAuctionDetails,
  IFixedAuctionDetails,
  isEnglishAuction,
} from '../../overview/actions/fetchPoolDetails';
import { getPoolsByFilter } from '../../profile/api/getPoolsByFilter';
import { queryBrandItem1155, queryBrandItem721 } from './queryBrandItems';

// TODO: Merge with src/modules/profile/actions/fetchAllNftByUser.ts

export const listBrandItems = createSmartAction(
  'listBrandItems',
  ({ userAddress, contractAddress }) => ({
    request: {
      promise: (async function () {})(),
    },
    meta: {
      asMutation: true,
      onRequest: (
        reqeust: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: (async function () {
            const { data: items721 } = await store.dispatchRequest(
              queryBrandItem721({
                user_address: userAddress,
                contract_address: contractAddress,
              }),
            );

            const { data: items1155 } = await store.dispatchRequest(
              queryBrandItem1155({
                user_address: userAddress,
                contract_address: contractAddress,
              }),
            );

            const nfts = [...(items721 ?? []), ...(items1155 ?? [])];

            const { data: pools } = await store.dispatchRequest(
              getPoolsByFilter({
                user: userAddress,
                contract_address: contractAddress,
              }),
            );

            const filterPools = pools?.list.filter(pool => {
              return (
                pool.state === AuctionState.Live ||
                pool.state === FixedSwapState.Live
              );
            });

            const ids = [
              ...(filterPools?.map(item => item.tokenId) ?? []),
              ...nfts.map(
                (item: any) => item.tokenId || parseInt(item.token_id),
              ),
            ];
            const cts = [
              ...(filterPools?.map(item => item.tokenContract) ?? []),
              ...nfts.map((item: any) => item.token0 || item.contract_addr),
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

            const poolsCopy = filterPools || [];

            const getEnglishAuctionPrice = (pool: IEnglishAuctionDetails) => {
              return pool.lastestBidAmount.isEqualTo(0)
                ? pool.amountMin1
                : pool.lastestBidAmount;
            };

            const getFixedSwapPrice = (pool: IFixedAuctionDetails) => {
              return pool.price;
            };

            return (
              data
                ?.map(item => {
                  const poolIndex = poolsCopy.findIndex(
                    pool => pool.tokenId === item.id,
                  );
                  const pool = poolsCopy[poolIndex];

                  if (pool) {
                    poolsCopy.splice(poolIndex, 1);
                    return {
                      ...item,
                      supply: (() => {
                        if (isEnglishAuction(pool)) {
                          if (pool.state < AuctionState.NotSoldByReservePrice) {
                            return pool.tokenAmount0;
                          }

                          return 0;
                        } else {
                          if (pool.state < FixedSwapState.Canceled) {
                            return pool.quantity;
                          } else {
                            return 0;
                          }
                        }
                      })(),
                      poolId: pool.poolId,
                      poolType: pool.auctionType,
                      price:
                        pool.auctionType === AuctionType.EnglishAuction ||
                        pool.auctionType === AuctionType.EnglishAuction_Timing
                          ? getEnglishAuctionPrice(
                              pool as IEnglishAuctionDetails,
                            )
                          : getFixedSwapPrice(pool as IFixedAuctionDetails),
                      state: pool.state,
                      openAt: pool.openAt,
                    };
                  }

                  const supply = nfts.find(
                    nftItem => nftItem.token_id === String(item.id),
                  )?.balance;

                  return { ...item, supply: supply };
                })
                // .filter(item => item.supply > 0)
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
