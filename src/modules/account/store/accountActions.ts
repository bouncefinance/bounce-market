import { createAction as createSmartAction } from 'redux-smart-actions';

export const AccountActions = {
  connect: createSmartAction('CONNECT_WALLET'),
};
