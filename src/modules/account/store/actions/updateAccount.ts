import { createAction as createSmartAction } from 'redux-smart-actions';
import { ISetAccountData, setAccount } from './setAccount';

export const updateAccount = createSmartAction(
  'AccountActions/updateAccount',
  ({ ...updatedData }) => ({
    request: {
      promise: (async function () {})(),
    },
    meta: {
      mutations: {
        [setAccount.toString()]: (
          data: ISetAccountData,
        ): ISetAccountData | undefined => {
          if (data) {
            return {
              ...data,
              ...updatedData,
            };
          }
          return data;
        },
      },
    },
  }),
);
