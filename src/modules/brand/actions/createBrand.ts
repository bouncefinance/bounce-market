import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { setAccount } from 'modules/account/store/actions/setAccount';
import { ZERO_ADDRESS } from 'modules/common/conts';
import { NftType } from 'modules/createNFT/actions/createNft';
import { uploadFile } from 'modules/createNFT/actions/uploadFile';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store/store';
import { ICreateBrand } from '../screens/CreateBrand';
import { CreateBrandAction, getFactoryContract } from './const';
import { queryBrandAddress } from './queryCreatedBrand';
import { IUpdateBrandInfoPayload, updateBrandInfo } from './updateBrandInfo';
import { AbiItem } from 'web3-utils';
import BounceNFTFactory from '../contract/BounceNFTFactory.json';
import BoucneErc721 from '../contract/BounceErc1155.json';
import BounceErc1155 from '../contract/BounceErc1155.json';
import { TransactionReceipt } from '@ethersproject/abstract-provider';

export const createBrand = createSmartAction(CreateBrandAction, ({
  brandName,
  standard,
  description,
  brandSymbol,
  file,
}: ICreateBrand) => ({
  request: {
    promise: (async function () { })(),
  },
  meta: {
    asMutation: true,
    onRequest: (
      request: { promise: Promise<any> },
      action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest }
    ) => {
      return {
        promise: (async () => {
          const uploadFileResult = await store.dispatchRequest(uploadFile({ file }));
          
          const {
            data: { address, chainId, web3 },
          } = getQuery(store.getState(), {
            type: setAccount.toString(),
            action: setAccount
          })
          
          const brandAddress = await store.dispatchRequest(queryBrandAddress({address}))
          
          const brandInfo: IUpdateBrandInfoPayload = {
            brandname: brandName,
            contractaddress: brandAddress.data ?? '',
            standard: standard,
            description: description,
            imgurl: uploadFileResult.data?.path ?? '',
            owneraddress: address,
            ownername: '',
          }
          
          if (brandAddress.data !== ZERO_ADDRESS) {
            await store.dispatchRequest(updateBrandInfo(brandInfo));
          } else {
            const contract = new web3.eth.Contract(
              (BounceNFTFactory.abi as unknown) as AbiItem,
              getFactoryContract(chainId)
            )
            const _name = brandName;
            const _symbol = brandSymbol;
            const _uri = 'http://fangible.com/';
            const _mode = 0; //0 only owner can mint; 1 whitelist address can mint; 2: everyone
            const bytecode_721 = BoucneErc721.bytecode;
            const bytecode_1155 = BounceErc1155.bytecode;
            
            if (standard === NftType.ERC721) {
              return await new Promise((resolve, reject) => {
                contract.methods
                  .createBrand721(bytecode_721, _name, _symbol, _mode)
                  .send({ from: address })
                  .on('transactionHash', (hash: string) => {
                    // Pending status
                  })
                  .on('receipt', async (receipt: TransactionReceipt) => {
                    resolve(await store.dispatchRequest(updateBrandInfo(brandInfo)));
                  })
                  .on('error', (error: Error) => {
                    reject(error);
                  });
              })
            } else if (standard === NftType.ERC1155) {
              return await new Promise((resolve, reject) => {
                contract.methods
                  .createBrand1155(bytecode_1155, _uri, _mode)
                  .send({ from: address })
                  .on('transactionHash', (hash: string) => {
                    // Pending status
                  })
                  .on('receipt', async (receipt: TransactionReceipt) => {
                    resolve(await store.dispatchRequest(updateBrandInfo(brandInfo)));
                  })
                  .on('error', (error: Error) => {
                    reject(error);
                  });
              })
            }
          }
        })(),
      };
    },
  },
}));
