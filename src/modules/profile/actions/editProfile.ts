import { createAction as createSmartAction } from 'redux-smart-actions';

export const editProfile = createSmartAction('/editProfile', () => ({
  request: {
    promise: (async function () {
      return true;
    })(),
  },
  meta: {
    asMutation: true,
  },
}));
