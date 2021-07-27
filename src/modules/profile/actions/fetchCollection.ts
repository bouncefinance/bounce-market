import { createAction as createSmartAction } from 'redux-smart-actions';

interface IFetchCollectionArgs {
  accountaddress: string;
  brandsymbol?: string;
}
export const fetchCollection = createSmartAction(
  'fetchCollection',
  ({ accountaddress, brandsymbol = '' }: IFetchCollectionArgs) => ({
    request: {
      url: '/getmycollectionbyfilter',
      method: 'post',
      data: {
        accountaddress,
        brandsymbol,
      },
    },
    meta: {
      asMutation: false,
      auth: true,
      driver: 'axios',
      getData: (data: any) => {
        if (data.code !== 1) {
          console.error('fetchProfileInfo:', data?.msg ?? 'Unexpected error');
          return;
        }
        return data;
      },
    },
  }),
);
