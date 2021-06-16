import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { Store } from 'redux';
import { setAccount } from 'modules/account/store/actions/setAccount';
import {
  BounceErc721,
  BounceErc1155,
} from '../../web3/contracts';
import { NftType } from 'modules/createNFT/actions/createNft';

export const transferToken = createSmartAction(
  'transferToken',
  (contractAddress: string, standard: NftType) => ({
    request: {
      promise: (async function () {})(),
    },
    meta: {
      asMutation: true,
      onRequest: (
        request: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: (async function() {
            const {
              data: { web3 },
            } = getQuery(store.getState(), {
              type: setAccount.toString(),
              action: setAccount
            });

            const contract721 = new web3.eth.Contract(
              BounceErc721,
              contractAddress
            )

            const contract1155 = new web3.eth.Contract(
              BounceErc1155,
              contractAddress,
            )

            if (standard === NftType.ERC721) {
              console.log(contract721)
            } else if (standard === NftType.ERC1155) {
              console.log(contract1155)
            }
            
          })(),
        };
      },
    },
  }),
);
