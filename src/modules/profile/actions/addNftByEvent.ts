import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import { IItem } from '../../createNFT/actions/fetchNftByUser';
import { fetchAllNftByUser } from './fetchAllNftByUser';

interface IAddNFTByEventArgs {
  hash: string;
}

export type AddNftByEventMetaType = RequestActionMeta<any, IItem[]>;

const updateItemsMetaConfig: AddNftByEventMetaType = {
  asMutation: true,
  mutations: {
    [fetchAllNftByUser.toString()]: (
      data: IItem[],
      mutationData: IItem,
    ): IItem[] => {
      return [mutationData, ...data];
    },
  },
};

export const addNFTByEvent = createAction<
  RequestAction<any, IItem[]>,
  [IAddNFTByEventArgs, AddNftByEventMetaType?]
>('addNFTByEvent', (params, meta) => ({
  request: {
    promise: (async function () {})(),
  },
  meta: {
    ...meta,
    ...updateItemsMetaConfig,
    onRequest: () => ({
      promise: (async () => {
        const response = {
          hash: params.hash,
          isLoading: true,
        };

        return response;
      })(),
    }),
  },
}));
