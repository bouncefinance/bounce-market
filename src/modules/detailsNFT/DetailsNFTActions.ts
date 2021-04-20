import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction } from '@redux-requests/core';
import { IApiNFTDetails, INFTDetails } from './api/NFTDetails';
import fileurl from './assets/12.png';

export const DetailsNFTActions = {
  fethItem: createSmartAction<RequestAction<IApiNFTDetails, INFTDetails>>(
    'DetailsNFTActions/fethItem',
    (params: { id: number }) => ({
      request: {
        promise: (async function () {
          return {
            brandid: 100,
            category: 'image',
            channel: 'Sports',
            contractaddress: '0x296C12B608A1Fc467aeb60909a0D0Fa88c704046',
            created_at: new Date('2021-03-31T16:42:46Z'),
            description:
              'A 2015 ESPN profile praised Donnarumma\'s fundamental goalkeeping skills, identifying his large slender frame and reach, agility, and composed nature as his biggest strengths; writer Nick Dorrington additionally described the teenager as "a natural leader [with] the necessary confidence to organise a defence featuring players twice his age."',
            externallink: '',
            fileurl,
            id: 16782,
            itemname: 'Gianluigi Donnarumma',
            itemsymbol: '',
            levels: '',
            metadata: '',
            owneraddress: '0x2d3fff58da3346dce601f6db8eec57906cdb17be',
            ownername: '',
            popularweight: 14,
            price: '',
            properties: '',
            standard: 1,
            stats: '',
            status: 1,
            supply: 1,
            unlockablecontent: 0,
            updated_at: '2021-04-18T12:53:30Z',
          };
        })(),
      },
      meta: {
        // getData: data => mapNFTDetails(data),
        // onRequest: (
        //   request: any,
        //   action: RequestAction,
        //   store: Store<RootState> & { dispatchRequest: DispatchRequest },
        // ) => {
        //   const { data } = getQuery(store.getState(), {
        //     type: AccountActions.setAccount.toString(),
        //     action: AccountActions.setAccount,
        //   });
        //   request.data.accountaddress = data?.address;
        //   return request;
        // },
        // auth: true,
        // driver: 'axios',
        asMutation: false,
      },
    }),
  ),
};
