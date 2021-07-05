import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { setAccount } from 'modules/account/store/actions/setAccount';
import { uploadFile } from 'modules/common/actions/uploadFile';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { ICreateBrand } from '../screens/CreateBrand';
import { getBrandContract } from './const';
import { IUpdateBrandInfoPayload, updateBrandInfo } from './updateBrandInfo';
import { NftType } from 'modules/createNFT/actions/createNft';
import {
  BoucneErc1155Bytecode,
  BoucneErc721Bytecode,
  BounceNFTFactoryV2,
} from '../../web3/contracts';
import { throwIfError } from '../../common/utils/throwIfError';
import { BlockchainNetworkId } from 'modules/common/conts';

const chaiToBrandUri: {
  [key in BlockchainNetworkId]: string | undefined;
} = {
  [BlockchainNetworkId.mainnet]:
    process.env.REACT_APP_BRAND_BASEURI_ETH_MAINNET,
  [BlockchainNetworkId.ropsten]: undefined,
  [BlockchainNetworkId.rinkeby]: undefined,
  [BlockchainNetworkId.goerli]: undefined,
  [BlockchainNetworkId.dev]: undefined,
  [BlockchainNetworkId.classic]: undefined,
  [BlockchainNetworkId.mordor]: undefined,
  [BlockchainNetworkId.kotti]: undefined,
  [BlockchainNetworkId.smartchain]: process.env.REACT_APP_BRAND_BASEURI,
  [BlockchainNetworkId.smartchainTestnet]: undefined,
  [BlockchainNetworkId.heco]: process.env.REACT_APP_BRAND_BASEURI_HECO,
};

function getBrandUri(chainId: BlockchainNetworkId): string {
  return chaiToBrandUri[chainId] ?? '';
}

export const createBrand = createSmartAction(
  'createBrand',
  ({ brandName, standard, description, brandSymbol, file }: ICreateBrand) => ({
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
          promise: (async () => {
            const {
              data: { address, chainId, web3 },
            } = getQuery(store.getState(), {
              type: setAccount.toString(),
              action: setAccount,
            });

            const uploadFileResult = await store.dispatchRequest(
              uploadFile({ file }),
            );

            const brandInfo: IUpdateBrandInfoPayload = {
              brandname: brandName,
              contractaddress: '',
              standard: standard,
              description: description,
              imgurl: uploadFileResult.data?.result.path ?? '',
              owneraddress: address,
              ownername: '',
              txid: '',
            };

            const contract = new web3.eth.Contract(
              BounceNFTFactoryV2,
              getBrandContract(chainId),
            );
            const _name = brandName;
            const _symbol = brandSymbol;
            const _uri = getBrandUri(chainId);
            const _mode = 0; //0 only owner can mint; 1 whitelist address can mint; 2: everyone
            const bytecode_721 = BoucneErc721Bytecode;
            const bytecode_1155 = BoucneErc1155Bytecode;
            if (standard === NftType.ERC721) {
              return await new Promise((resolve, reject) => {
                contract.methods
                  .createBrand721(bytecode_721, _uri, _name, _symbol, _mode)
                  .send({ from: address })
                  .on('transactionHash', (hash: string) => {
                    brandInfo.txid = hash;
                  })
                  .on('receipt', async (receipt: any) => {
                    const createEvent = receipt.events.Brand721Created;
                    brandInfo.contractaddress = createEvent.returnValues.nft;
                    try {
                      resolve(
                        throwIfError(
                          await store.dispatchRequest(
                            updateBrandInfo(brandInfo),
                          ),
                        ),
                      );
                    } catch (error) {
                      reject(error);
                    }
                  })
                  .on('error', (error: Error) => {
                    reject(error);
                  });
              });
            } else if (standard === NftType.ERC1155) {
              return await new Promise((resolve, reject) => {
                contract.methods
                  .createBrand1155(bytecode_1155, _uri, _mode)
                  .send({ from: address })
                  .on('transactionHash', (hash: string) => {
                    brandInfo.txid = hash;
                  })
                  .on('receipt', async (receipt: any) => {
                    const createEvent = receipt.events.Brand1155Created;
                    brandInfo.contractaddress = createEvent.returnValues.nft;
                    try {
                      resolve(
                        throwIfError(
                          await store.dispatchRequest(
                            updateBrandInfo(brandInfo),
                          ),
                        ),
                      );
                    } catch (error) {
                      reject(error);
                    }
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
