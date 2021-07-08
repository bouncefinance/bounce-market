import { createAction as createSmartAction } from 'redux-smart-actions';

export const connect = createSmartAction('AccountActions/connect');
export const connectIsFinished = createSmartAction(
  'AccountActions/connectIsFinished',
);
