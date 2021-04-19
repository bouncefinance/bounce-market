import { createAction as createSmartAction } from 'redux-smart-actions';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { RootState } from '../../store/store';
import { Store } from 'redux';
import {
  IApiUploadFileResponse,
  IApiUploadFileSuccess,
} from './api/uploadFile';
import { AccountActions } from '../account/store/accountActions';
import { getBounceERC1155WithSign, getBounceERC721WithSign } from './api/sign';
import { IAddItem, IApiAddItem, mapAddItem } from './api/addItem';
import BounceERC721WithSign from './contracts/BounceERC721WithSign.json';
import BounceERC1155WithSign from './contracts/BounceERC1155WithSign.json';
import { AbiItem } from 'web3-utils';
import { TransactionReceipt } from '@ethersproject/abstract-provider';

interface IAddItemPayload {
  brandid: number;
  category: 'image';
  channel: Channel;
  contractaddress: string;
  description: string;
  fileurl: string;
  itemname: string;
  itemsymbol: 'BOUNCE';
  owneraddress: string;
  ownername: string;
  standard: 1 | 2;
  supply: number; // is supply an integer?
}

export enum Channel {
  FineArts = 'Fine Arts',
  Sports = 'Sports',
  Conicbooks = 'Comics',
}

export enum Standard {
  ERC721,
  ERC1155,
}

export interface ICreateNFTPayload {
  name: string;
  description: string;
  channel: Channel;
  standard: Standard;
  supply: number;
  file: File;
}

export const CreateNftActions = {
  createNft: createSmartAction(
    'MarketplaceActions/createNft',
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
              const { data } = await store.dispatchRequest(
                CreateNftActions.uploadFile({ file }),
              );

              const {
                data: { address, chainId, web3 },
              } = getQuery(store.getState(), {
                type: AccountActions.setAccount.toString(),
                action: AccountActions.setAccount,
              });

              const addItemPayload: IAddItemPayload = {
                brandid: standard === Standard.ERC721 ? 10 : 11,
                category: 'image',
                channel,
                contractaddress:
                  standard === Standard.ERC721
                    ? getBounceERC721WithSign(chainId)
                    : getBounceERC1155WithSign(chainId),
                description,
                fileurl: data?.path || '',
                itemname: name,
                itemsymbol: 'BOUNCE',
                owneraddress: address,
                ownername: 'foobar',
                standard: standard === Standard.ERC721 ? 1 : 2,
                supply: standard === Standard.ERC721 ? 1 : supply, // is supply an integer?
              };

              const { data: addItemData } = await store.dispatchRequest(
                CreateNftActions.addItem(addItemPayload),
              );

              if (!addItemData) {
                throw new Error("Item hasn't been added");
              }

              if (standard === Standard.ERC721) {
                return await new Promise((resolve, reject) => {
                  const ContractBounceERC721WithSign = new web3.eth.Contract(
                    (BounceERC721WithSign.abi as unknown) as AbiItem,
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
                      resolve(receipt);
                    })
                    .on('error', (error: Error) => {
                      reject(error);
                    });
                });
              } else {
                return await new Promise((resolve, reject) => {
                  const ContractBounceERC1155WithSign = new web3.eth.Contract(
                    (BounceERC1155WithSign.abi as unknown) as AbiItem,
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
                      resolve(receipt);
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
  ),
  uploadFile: createSmartAction<
    RequestAction<IApiUploadFileResponse, IApiUploadFileSuccess['result']>,
    [{ file: File }]
  >('CreateNftActions/uploadFile', data => {
    const formData = new FormData();
    formData.append('filename', data.file);
    return {
      request: {
        url: '/api/v2/main/auth/fileupload',
        method: 'post',
        data: formData,
      },
      meta: {
        auth: true,
        driver: 'axios',
        asMutation: true,
        getData: (data: IApiUploadFileResponse) => {
          if (data.code !== 200) {
            throw new Error(data.msg);
          }
          return data.result;
        },
      },
    };
  }),
  addItem: createSmartAction<
    RequestAction<IApiAddItem, IAddItem>,
    [IAddItemPayload]
  >('CreateNftActions/addItem', data => {
    return {
      request: {
        url: '/api/v2/main/auth/additem',
        method: 'post',
        data,
      },
      meta: {
        auth: true,
        driver: 'axios',
        asMutation: true,
        getData: data => {
          if (data.code !== 1) {
            throw new Error('Unexpected response');
          }
          return mapAddItem(data);
        },
      },
    };
  }),
};
