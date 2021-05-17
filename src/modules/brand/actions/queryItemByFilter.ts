
import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { QueryBrandItemsAction } from './const';

export const queryBrandItems = createSmartAction(
  QueryBrandItemsAction,
  () => ({
    request: {
      promise: (async function(){})(),
    },
    meta: {
      asMutatiion: true,
      onRequest: (
        request: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: ( async () => {
            
          })
        }
      }
    }
  })
)