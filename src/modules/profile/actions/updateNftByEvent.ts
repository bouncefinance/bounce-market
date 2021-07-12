import {
  DispatchRequest,
  RequestAction,
  RequestActionMeta,
} from '@redux-requests/core';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store/store';
import { fetchNftByUser, IItem } from '../../createNFT/actions/fetchNftByUser';
import {
  enrichNftItem,
  fetchAllNftByUser,
  filterOutClosedPools,
} from './fetchAllNftByUser';
import { throwIfError } from '../../common/utils/throwIfError';
import { getPoolsByFilter } from '../api/getPoolsByFilter';
import { fetchItem } from '../../buyNFT/actions/fetchItem';
import { AddNftByEventMetaType } from './addNftByEvent';

interface IUpdateNFTByEventArgs {
  address: string;
  id: number;
  hash: string;
  contractAddress: string;
}

export type UpdateNftByEventMetaType = RequestActionMeta<any, IItem[]>;

const updateItemsMetaConfig: UpdateNftByEventMetaType = {
  asMutation: true,
  mutations: {
    [fetchAllNftByUser.toString()]: (
      data: IItem[],
      mutationData: IItem,
    ): IItem[] => {
      const previwedItemIndex = data.findIndex(
        item => item.hash === mutationData.hash,
      );
      if (previwedItemIndex > -1) {
        data.splice(previwedItemIndex, 1);
      }
      return [mutationData, ...data];
    },
  },
};

export const updateNFTByEvent = createAction<
  RequestAction<any, IItem[]>,
  [IUpdateNFTByEventArgs, AddNftByEventMetaType?]
>('updateNFTByEvent', (params, meta) => ({
  request: {
    promise: (async function () {})(),
  },
  meta: {
    ...meta,
    ...updateItemsMetaConfig,
    request: {
      promise: (async function () {})(),
    },
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
                { userId: params.address },
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
            getPoolsByFilter({ user: params.address }),
          );

          // Filter out the pools that have been closed
          const poolsByStateFilterResult = filterOutClosedPools(pools);

          const data = await getItem(params, store);

          const poolsCopy = poolsByStateFilterResult
            ? [...poolsByStateFilterResult?.list!]
            : [];

          return enrichNftItem(data, poolsCopy, nfts)(data);
        })(),
      };
    },
  },
}));

export const getItem = async (
  item: IUpdateNFTByEventArgs,
  store: any,
): Promise<IItem> => {
  const { data } = await store.dispatchRequest(
    fetchItem(
      { id: item.id, contract: item.contractAddress },
      {
        silent: true,
        suppressErrorNotification: true,
        requestKey: item.id + item.contractAddress + Math.random(),
      },
    ),
  );
  data.hash = item.hash;

  return data;
};
