import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { AuctionState } from '../../api/common/AuctionState';
import { AuctionType } from '../../api/common/auctionType';
import { FixedSwapState } from '../../api/common/FixedSwapState';
import { fetchItem, IFetchItem } from '../../buyNFT/actions/fetchItem';
import { IPoolsData } from '../../common/actions/getPoolsByFilter';
import { throwIfError } from '../../common/utils/throwIfError';
import { fetchNftByUser } from '../../createNFT/actions/fetchNftByUser';
import { isEnglishAuction } from '../../overview/actions/fetchPoolDetails';
import { getPoolsByFilter } from '../api/getPoolsByFilter';

export interface IApiFetchNftByUserVariables {
  user: string;
}

export const fetchAllNftByUser = createSmartAction(
  'fetchAllNftByUser',
  (address: string) => ({
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
            const { data: fetchNftByUserData } = throwIfError(
              await store.dispatchRequest(
                fetchNftByUser(
                  { userId: address },
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
              getPoolsByFilter({ user: address }),
            );

            // Filter out the pools that have been closed
            const poolsByStateFilterResult = filterOutClosedPools(pools);

            const items = prepareItemsToRequest(nfts, poolsByStateFilterResult);

            const data = (
              await Promise.all(items.map(item => getItem(item, store)))
            ).map((response: any) => response.data);

            const poolsCopy = poolsByStateFilterResult
              ? [...poolsByStateFilterResult?.list!]
              : [];

            return (
              data
                ?.map(enrichNftItem(data, poolsCopy, nfts))
                // Meaningless NFT will be temporarily shielded to reduce interference
                .filter(
                  item =>
                    item.supply > 0 &&
                    item.itemName !== 'Untitled (External import)',
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

export const prepareItemsToRequest = (
  nfts: any,
  poolsByStateFilterResult: IPoolsData,
) => {
  const ids = [
    ...(poolsByStateFilterResult?.list!.map(item => item.tokenId) ?? []),
    ...(nfts.map((item: any) => item.tokenId) ?? []),
  ];
  const cts = [
    ...(poolsByStateFilterResult?.list!.map(item => item.tokenContract) ?? []),
    ...(nfts.map((item: any) => item.contractAddress) ?? []),
  ];

  const items = ids
    .map((id, index) => ({
      id,
      contractAddress: cts[index],
    }))
    .filter(item => item.id < 999999999);

  return items;
};

export const filterOutClosedPools = (pools: any) => ({
  list: pools?.list.filter((item: any) => item.state !== 1),
});

export const getItem = (item: any, store: any): Promise<IFetchItem> =>
  store.dispatchRequest(
    fetchItem(
      { id: item.id, contract: item.contractAddress },
      {
        silent: true,
        suppressErrorNotification: true,
        requestKey: item.id + item.contractAddress + Math.random(),
      },
    ),
  );

export const getSupplyStatus = (pool: any) => {
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
};

export const enrichNftItem = (data: any, poolsCopy: any, nfts: any) => (
  item: any,
) => {
  const poolIndex = poolsCopy.findIndex(
    (pool: any) => pool.tokenId === item.id,
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
      openAt: pool.openAt,
    };
  }

  const supply = nfts.find((nftItem: any) => nftItem.tokenId === item.id)
    ?.balance;

  return { ...item, supply: supply ?? 0 };
};
