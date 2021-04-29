import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { IItem } from '../../overview/api/getItems';
import { IApiFetchNftByUserVariables } from '../../createNFT/api/fetchNftByUser';
import { Store } from 'redux';
import { RootState } from '../../../store/store';
import { fetchNftByUser } from '../../createNFT/actions/fetchNftByUser';
import { fetchItemsByFilter } from '../../createNFT/actions/fetchItemsByFilter';
import { getPoolsByFilter } from '../api/getPoolsByFilter';
import { createAction } from 'redux-smart-actions';

export const fetchAllNftByUser: (
  payload: IApiFetchNftByUserVariables,
) => RequestAction<IItem[], IItem[]> = createAction(
  'fetchAllNftByUser',
  (payload: IApiFetchNftByUserVariables) => ({
    request: {
      promise: (async function () {})(),
    },
    meta: {
      getData: data => data,
      onRequest: (
        request: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: (async function () {
            const {
              data: fetchNftByUserData,
              error: fetchNftByUserError,
            } = await store.dispatchRequest(
              fetchNftByUser(
                { userId: payload.user },
                {
                  silent: true,
                  suppressErrorNotification: true,
                  requestKey: action.type,
                },
              ),
            );

            if (fetchNftByUserError) {
              throw fetchNftByUserError;
            }

            const { data: pools } = await store.dispatchRequest(
              getPoolsByFilter(payload),
            );

            const ids = [
              ...(fetchNftByUserData?.nfts721.map(item => item.tokenId) ?? []),
              ...(fetchNftByUserData?.nfts1155.map(item => item.tokenId) ?? []),
              ...(pools?.tradePools.map((item: any) => item.tokenId) ?? []),
              ...(pools?.tradeAuctions.map((item: any) => item.tokenId) ?? []),
            ];
            const cts = [
              ...(fetchNftByUserData?.nfts721.map(
                item => item.contractAddress,
              ) ?? []),
              ...(fetchNftByUserData?.nfts1155.map(
                item => item.contractAddress,
              ) ?? []),
              ...(pools?.tradePools.map((item: any) => item.tokenId) ?? []),
              ...(pools?.tradeAuctions.map((item: any) => item.tokenId) ?? []),
            ];

            const {
              data,
              error: fetchItemsError,
            } = await store.dispatchRequest(
              fetchItemsByFilter(
                { ids, cts },
                {
                  silent: true,
                  suppressErrorNotification: true,
                  requestKey: action.type,
                },
              ),
            );

            if (fetchItemsError) {
              throw fetchItemsError;
            }

            return data;
          })(),
        };
      },
    },
  }),
);
