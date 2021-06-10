import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { uploadFile } from 'modules/common/actions/uploadFile';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { setAccount } from '../../account/store/actions/setAccount';
import { getBounceERC1155WithSign, getBounceERC721WithSign } from '../api/sign';
import { addItem, IAddItemPayload } from './addItem';
import {
  BounceERC1155WithSign,
  BounceERC721WithSign,
} from '../../web3/contracts';
import { isVideo } from '../../common/utils/isVideo';
import { throwIfDataIsEmptyOrError } from '../../common/utils/throwIfDataIsEmptyOrError';

export enum NftType {
  ERC721,
  ERC1155,
}

export enum Channel {
  FineArts = 'FineArts',
  Sports = 'Sports',
  Comicbooks = 'Comicbooks',
}

export interface ICreateNFTPayload {
  name: string;
  description: string;
  channel: Channel;
  standard: NftType;
  supply: number;
  file: File;
}
// TODO: Remove timers
export const createNft = createSmartAction(
  'createNft',
  ({
    file,
    standard,
    supply,
    name,
    description,
    channel,
  }: ICreateNFTPayload) => ({
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
          promise: (async function () {
            const { data } = await store.dispatchRequest(uploadFile({ file }));

            const {
              data: { address, chainId, web3 },
            } = getQuery(store.getState(), {
              type: setAccount.toString(),
              action: setAccount,
            });

            const addItemPayload: IAddItemPayload = {
              brandid: standard === NftType.ERC721 ? 10 : 11,
              category: isVideo(file) ? 'video' : 'image',
              channel,
              contractaddress:
                standard === NftType.ERC721
                  ? getBounceERC721WithSign(chainId)
                  : getBounceERC1155WithSign(chainId),
              description,
              fileurl: data?.result.path || '',
              itemname: name,
              itemsymbol: 'BOUNCE',
              owneraddress: address,
              ownername: '', // TODO: Update
              standard: standard,
              supply: standard === NftType.ERC721 ? 1 : supply, // is supply an integer?
            };

            const { data: addItemData } = throwIfDataIsEmptyOrError(
              await store.dispatchRequest(addItem(addItemPayload)),
            );

            if (!addItemData) {
              throw new Error("Item hasn't been added");
            }

            if (standard === NftType.ERC721) {
              return await new Promise((resolve, reject) => {
                const ContractBounceERC721WithSign = new web3.eth.Contract(
                  BounceERC721WithSign,
                  getBounceERC721WithSign(chainId),
                );

                ContractBounceERC721WithSign.methods
                  .mintUser(
                    addItemData.id,
                    addItemData.signatureStr,
                    addItemData.expiredTime,
                  )
                  .send({ from: address })
                  .on('transactionHash', (hash: string) => {
                    // Pending status
                  })
                  .on('receipt', async (receipt: TransactionReceipt) => {
                    setTimeout(() => {
                      resolve(receipt);
                    }, 15000);
                  })
                  .on('error', (error: Error) => {
                    reject(error);
                  });
              });
            } else {
              return await new Promise((resolve, reject) => {
                const ContractBounceERC1155WithSign = new web3.eth.Contract(
                  BounceERC1155WithSign,
                  getBounceERC1155WithSign(chainId),
                );
                ContractBounceERC1155WithSign.methods
                  .mintUser(
                    addItemData.id,
                    supply,
                    0,
                    addItemData.signatureStr,
                    addItemData.expiredTime,
                  )
                  .send({ from: address })
                  .on('transactionHash', (hash: string) => {
                    // Pending status
                  })
                  .on('receipt', async (receipt: TransactionReceipt) => {
                    setTimeout(() => {
                      resolve(receipt);
                    }, 15000);
                  })
                  .on('error', (error: Error) => {
                    reject(error);
                  });
              });
            }
          })(),
        };
      },
    },
  }),
);
