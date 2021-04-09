import { createAction as createSmartAction } from 'redux-smart-actions';

// TODO Just an example. Remove it later
export const FoobarActions = {
  foobar: createSmartAction('FOOBAR', () => ({
    request: {
      promise: (async function () {
        return Promise.resolve();
      })(),
    },
    meta: {
      asMutation: true,
    },
  })),
};
