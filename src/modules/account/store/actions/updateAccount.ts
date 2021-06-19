import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import { ISetAccountData, setAccount } from './setAccount';

export const updateAccount = createAction<RequestAction<any, ISetAccountData>>(
  'AccountActions/updateAccount',
  (updatedData: ISetAccountData) => ({
    request: {
      promise: (async function () {})(),
    },
    meta: {
      asMutation: true,
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
