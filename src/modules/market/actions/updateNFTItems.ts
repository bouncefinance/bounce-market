import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { queryAccountInfo } from 'modules/common/actions/queryAccountInfo';
import { ZERO_ADDRESS } from 'modules/common/conts';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import {
  fetchNFTItems,
  FetchNFTItemsMetaType,
  FetchNFTItemsStatus,
  IFetchNFTItems,
  INFTItem,
  mapNFTItem,
} from 'modules/overview/actions/fetchNFTItems';
import { fetchPools } from 'modules/overview/actions/fetchPools';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store/store';

interface IUpdateNFTItemsArgs {
  channel: ItemsChannel;
  limit: number;
  offset: number;
}

const updateItemsMetaConfig: FetchNFTItemsMetaType = {
  asMutation: true,
  mutations: {
    [fetchNFTItems.toString()]: (
      data: IFetchNFTItems,
      mutationData: IFetchNFTItems,
    ): IFetchNFTItems => {
      return {
        ...mutationData,
        items: mutationData.items,
      };
    },
  },
};

export const updateNFTItems = createAction<
  RequestAction<any, IFetchNFTItems>,
  [IUpdateNFTItemsArgs, FetchNFTItemsMetaType?]
>('updateNFTItems', (params, meta) => ({
  request: {
    promise: (async function () {})(),
  },
  meta: {
    ...meta,
    ...updateItemsMetaConfig,
    onRequest: (
      _request: { promise: Promise<any> },
      _action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => ({
      promise: (async () => {
        const queryResponse: IFetchNFTItems = {
          items: [],
          status: FetchNFTItemsStatus.done,
          offset: params.offset ?? 0,
          total: 0
        };

        const { data: poolsData } = await store.dispatchRequest(
          fetchPools(
            {
              channel: params.channel,
              limit: params.limit,
              offset: params.offset,
              category: '',
              currency: ZERO_ADDRESS,
              orderfield: 1,
            },
            {
              silent: true,
            },
          ),
        );

        if (!poolsData) {
          return queryResponse;
        }

        const tradePools = poolsData.data
          .filter(item => item.state !== 1)
          .map(mapNFTItem);

        const tradePoolsWithOwnerImg: INFTItem[] = await Promise.all(
          tradePools.map(async item => {
            const response = await store.dispatchRequest(
              queryAccountInfo(
                { accountAddress: item.owneraddress },
                { requestKey: `${item.poolId}`, silent: true },
              ),
            );

            return {
              ...item,
              ownerAvatar: response.data?.imgUrl,
              ownerName: response.data?.username,
            };
          }),
        );

        queryResponse.items = tradePoolsWithOwnerImg;
        queryResponse.status =
          poolsData.data.length < params.limit
            ? FetchNFTItemsStatus.done
            : FetchNFTItemsStatus.inProgress;
        queryResponse.total = poolsData.total;

        return queryResponse;
      })(),
    }),
  },
}));
