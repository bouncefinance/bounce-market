import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { Store } from 'redux';
import { RootState } from '../../../store';
import { fetchActivities } from './fetchActivities';
import type { IFetchActivitiesVariables } from './fetchActivities';
import { IActivityItem } from '../api/getActivity';
import { throwIfDataIsEmptyOrError } from '../../common/utils/throwIfDataIsEmptyOrError';
import { addTokenSymbolByDriver } from 'modules/common/utils/addTokenSymbolByDriver';

export const fetchActivitiesTable = createSmartAction<
  RequestAction<IActivityItem[], IActivityItem[]>
>('fetchActivitiesTable', (payload: IFetchActivitiesVariables) => ({
  request: {
    promise: (async function () {})(),
  },
  meta: {
    auth: true,
    asMutation: false,
    onSuccess: addTokenSymbolByDriver,
    onRequest: (
      request: { promise: Promise<any> },
      action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async function () {
          const { data } = throwIfDataIsEmptyOrError(
            await store?.dispatchRequest(fetchActivities({ ...payload })),
          );
          return data;
        })(),
      };
    },
    getData: data => data,
  },
}));
