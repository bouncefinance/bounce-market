import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { IPoolNftItem } from 'modules/api/common/poolType';
import { addTokenSymbolByDriver } from 'modules/common/utils/addTokenSymbolByDriver';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { fetchPoolsWeight, IOverviewItem } from './fetchPoolsWeight';

export const fetchOverview = createSmartAction<
  RequestAction<IPoolNftItem, IOverviewItem[]>
>('fetchOverview', () => {
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

            return poolsInfoData ?? [];
          })(),
        };
      },
      onSuccess: addTokenSymbolByDriver,
    },
  };
});
