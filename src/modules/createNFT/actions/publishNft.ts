import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction } from '@redux-requests/core';

export interface IPublishNftPayload {}

export const publishNft = createSmartAction<
  RequestAction<null, null>,
  [IPublishNftPayload]
>('CreateNftActions/publishNft', () => {
  return {
    request: {
      promise: (async function () {})(),
    },
    meta: {
      asMutation: true,
    },
  };
});
