import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { NftType } from 'modules/api/common/NftType';
import { uploadFile } from 'modules/common/actions/uploadFile';
import { addItem, IAddItemPayload } from 'modules/createNFT/actions/addItem';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { setAccount } from '../../account/store/actions/setAccount';
import { isVideo } from '../../common/utils/isVideo';
import { BounceErc1155, BounceErc721 } from '../../web3/contracts';
import { IBrandInfo } from '../api/queryBrand';

export enum Channel {
  FineArts = 'FineArts',
  Sports = 'Sports',
  Comics = 'Comics',
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
export const createBrandNFT = createSmartAction(
  'createBrandNFT',
  (
    { file, standard, supply, name, description, channel }: ICreateNFTPayload,
    brandInfo: IBrandInfo,
  ) => ({
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
              data: { address, web3 },
            } = getQuery(store.getState(), {
              type: setAccount.toString(),
              action: setAccount,
            });

            const addItemPayload: IAddItemPayload = {
              brandid: brandInfo.id,
              category: isVideo(file) ? 'video' : 'image',
              channel,
              contractaddress: brandInfo.contractaddress,
              description,
              fileurl: data?.result.path || '',
              itemname: name,
              itemsymbol: brandInfo.brandsymbol,
              owneraddress: brandInfo.owneraddress,
              ownername: brandInfo.ownername,
              standard: brandInfo.standard,
              supply: standard === NftType.ERC721 ? 1 : supply,
            };

            const { data: addItemData } = await store.dispatchRequest(
              addItem(addItemPayload),
            );

            if (!addItemData) {
              throw new Error("Item hasn't been added");
            }

            if (standard === NftType.ERC721) {
              return await new Promise((resolve, reject) => {
                const ContractBounceERC72 = new web3.eth.Contract(
                  BounceErc721,
                  brandInfo.contractaddress,
                );

                ContractBounceERC72.methods

                  .mint(address, addItemData.id)
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
            } else if (standard === NftType.ERC1155) {
              return await new Promise((resolve, reject) => {
                const ContractBounceERC1155 = new web3.eth.Contract(
                  BounceErc1155,
                  brandInfo.contractaddress,
                );
                ContractBounceERC1155.methods
                  .mint(address, addItemData.id, supply, 0)
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
