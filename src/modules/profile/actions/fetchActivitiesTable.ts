import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { Store } from 'redux';
import { RootState } from '../../../store';
import { fetchActivities } from './fetchActivities';
import { fetchItemsByIds } from '../../overview/actions/fetchItemsByIds';
import { IActivityTableItem } from '../api/getActivity';
import { throwIfDataIsEmptyOrError } from '../../common/utils/throwIfDataIsEmptyOrError';

interface IFetchActivitiesVariables {
  user: string;
}

export const fetchActivitiesTable = createSmartAction<
  RequestAction<IActivityTableItem[], IActivityTableItem[]>
>('fetchActivitiesTable', (payload: IFetchActivitiesVariables) => ({
  request: {
    promise: (async function () {})(),
  },
  meta: {
    auth: true,
    asMutation: false,
    onRequest: (
      request: { promise: Promise<any> },
      action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async function () {
          const { data: activitiesData } = throwIfDataIsEmptyOrError(
            await store.dispatchRequest(
              fetchActivities({ user: payload.user }),
            ),
          );

          const { data } = throwIfDataIsEmptyOrError(
            await store.dispatchRequest(
              fetchItemsByIds(
                activitiesData.reduce(
                  (acc: { ids: number[]; cts: string[] }, current) => {
                    if (!current) {
                      return acc;
                    }

                    return {
                      ids: [...acc.ids, current.tokenId],
                      cts: [...acc.cts, current.contract],
                    };
                  },
                  { ids: [], cts: [] },
                ),
                { silent: true },
              ),
            ),
          );

          return activitiesData
            .map(activityItem => {
              const activity = data?.find(item => {
                return (
                  activityItem.tokenId === item.id &&
                  activityItem.contract === item.contractAddress
                );
              });

              if (!activity) return undefined;

              return {
                ...activityItem,
                fileUrl: activity.fileUrl,
                itemName: activity.itemName,
                category: activity.category || 'image',
              };
            })
            .filter(item => item && item.contract)
            .sort((a, b) => b!.timestamp - a!.timestamp);
        })(),
      };
    },
    getData: data => data,
  },
}));
