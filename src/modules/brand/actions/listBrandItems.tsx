import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { queryBrandItem1155, queryBrandItem721 } from './queryBrandItems';
import { getPoolsByFilter } from '../../profile/api/getPoolsByFilter';
import { fetchItem } from '../../buyNFT/actions/fetchItem';
import { isEnglishAuction } from '../../overview/actions/fetchPoolDetails';
import { AuctionType } from '../../overview/api/auctionType';
import { getPublishedCount } from '../../createNFT/utils/getPublishedCount';

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

            const { data: pools } = await store.dispatchRequest(
              getPoolsByFilter({ user: userAddress }),
            );

            const ids = [
              ...(pools?.list.map(item => item.tokenId) ?? []),
              ...items721.map(
                (item: any) => item.tokenId || parseInt(item.token_id),
              ),
              ...items1155.map(
                (item: any) => item.tokenId || parseInt(item.token_id),
              ),
            ];
            const cts = [
              ...(pools?.list.map(item => item.tokenContract) ?? []),
              ...items721.map((item: any) => item.token0 || item.contract_addr),
              ...items1155.map(
                (item: any) => item.token0 || item.contract_addr,
              ),
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
