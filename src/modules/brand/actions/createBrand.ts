import { createAction as createSmartAction } from 'redux-smart-actions';

export const createBrand = createSmartAction('/createBrand', () => ({
  request: {
    promise: (async function () {
      return true;
    })(),
  },
  meta: {
    asMutation: true,
  },
}));
