import { createAction as createSmartAction } from 'redux-smart-actions';
import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from '../../../store/store';
import { fetchPoolsWeight } from './fetchPoolsWeight';
import { fetchPoolDetails } from './fetchPoolDetails';
import { fetchItemsByIds } from './fetchItemsByIds';
import { IItem } from '../api/getItems';

export const fetchOverview = createSmartAction<RequestAction<IItem[], IItem[]>>(
  'fetchOverview',
  () => {
    return {
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
              const {
                data: poolsInfoData,
                error: poolsInfoError,
              } = await store.dispatchRequest(
                fetchPoolsWeight(
                  { limit: 13, offset: 0, orderweight: 1 },
                  { silent: true },
                ),
              );
              if (poolsInfoError || !poolsInfoData) {
                throw poolsInfoError;
              }

              const poolDetailsList = await Promise.all(
                poolsInfoData.list
                  .reverse()
                  .map(item =>
                    store.dispatchRequest(
                      fetchPoolDetails(
                        { poolId: item.poolId, standard: item.standard },
                        { silent: true, requestKey: item.poolId },
                      ),
                    ),
                  ),
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
                        cts: [...acc.cts, current.data.contractaddress],
                      };
                    },
                    { ids: [], cts: [] },
                  ),
                ),
              );

              return data;
            })(),
          };
        },
        asQuery: true,
      },
    };
  },
);
