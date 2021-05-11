import { createAction as createSmartAction } from 'redux-smart-actions';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { AuctionType } from '../../overview/api/auctionType';
import { Store } from 'redux';
import { RootState } from '../../../store/store';
import { setAccount } from '../../account/store/actions/setAccount';
import BounceFixedSwapNFT from '../contracts/BounceFixedSwapNFT.json';
import { AbiItem } from 'web3-utils';
import { getBounceERC1155WithSign, getBounceERC721WithSign } from '../api/sign';
import BounceERC721WithSign from '../contracts/BounceERC721WithSign.json';
import BounceERC1155WithSign from '../contracts/BounceERC1155WithSign.json';
import BounceEnglishAuctionNFT from '../contracts/BounceEnglishAuctionNFT.json';
import { NftType } from './createNft';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { Seconds } from '../../common/types/unit';

export const getFixedSwapContract = (chainID: number) => {
  switch (chainID) {
    case 1:
      return '';
    case 4:
      return '0x65B2FA838588003102fb3883e608f8b0049BFDD1';
    case 56:
      return '0x1C035FD1F11eA9Bb753625fD167205Cd40029607';
    default:
      return '0x65B2FA838588003102fb3883e608f8b0049BFDD1';
  }
};

export const getEnglishAuctionNFT = (chainID: number) => {
  switch (chainID) {
    case 1:
      return '';
    case 4:
      return '0xFe8f5BaB50ff6a9d5C7eE4b598efDF792a6a5525';
    case 56:
      return '0x780451a32959A96789F99398dEb6678d2c438EB4';
    default:
      return '0xFe8f5BaB50ff6a9d5C7eE4b598efDF792a6a5525';
  }
};

type IPublishNftPayload =
  | {
      type: AuctionType.FixedSwap;
      name: string;
      tokenContract: string;
      unitContract: string;
      standard: NftType;
      tokenId: number;
      price: BigNumber;
      quantity: number;
    }
  | {
      type: AuctionType.EnglishAuction;
      purchasePrice: number;
      minBid: number;
      minIncremental: number;
      reservePrice: number;
      duration: Seconds;
      name: string;
      tokenContract: string;
      unitContract: string;
      standard: NftType;
      tokenId: number;
      quantity: number;
    };

export const publishNft = createSmartAction<
  RequestAction<null, null>,
  [IPublishNftPayload]
>('publishNft', payload => {
  return {
    request: {
      promise: (async function () {})(),
    },
    meta: {
      onRequest: (
        request: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: (async function () {
            const {
              data: { chainId, address, web3 },
            } = getQuery(store.getState(), {
              type: setAccount.toString(),
              action: setAccount,
            });

            const ContractBounceFixedSwapNFT = new web3.eth.Contract(
              (BounceFixedSwapNFT.abi as unknown) as AbiItem,
              getFixedSwapContract(chainId),
            );
            const ContractBounceERC721WithSign = new web3.eth.Contract(
              (BounceERC721WithSign.abi as unknown) as AbiItem,
              getBounceERC721WithSign(chainId),
            );
            const ContractBounceERC1155WithSign = new web3.eth.Contract(
              (BounceERC1155WithSign.abi as unknown) as AbiItem,
              getBounceERC1155WithSign(chainId),
            );

            const onlyBOT = false;

            // TODO isOwner

            if (payload.type === AuctionType.FixedSwap) {
              const {
                name,
                tokenContract,
                unitContract,
                standard,
                tokenId,
                price,
                quantity,
              } = payload;

              if (standard === NftType.ERC721) {
                // TODO Has approve
                await ContractBounceERC721WithSign.methods
                  .approve(getFixedSwapContract(chainId), tokenId)
                  .send({ from: address });

                await new Promise((resolve, reject) => {
                  ContractBounceFixedSwapNFT.methods
                    .createErc721(
                      name,
                      tokenContract,
                      unitContract,
                      tokenId,
                      Web3.utils.toWei(price.toString()),
                      onlyBOT,
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
                await ContractBounceERC1155WithSign.methods
                  .setApprovalForAll(getFixedSwapContract(chainId), true)
                  .send({ from: address });

                await new Promise((resolve, reject) => {
                  ContractBounceFixedSwapNFT.methods
                    .createErc1155(
                      name,
                      tokenContract,
                      unitContract,
                      tokenId,
                      quantity,
                      Web3.utils.toWei(price.multipliedBy(quantity).toString()),
                      onlyBOT,
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
            } else {
              const {
                name,
                tokenContract,
                unitContract,
                standard,
                tokenId,
                purchasePrice,
                minBid,
                minIncremental,
                reservePrice,
                duration,
                quantity,
              } = payload;

              const ContractBounceEnglishAuctionNFT = new web3.eth.Contract(
                (BounceEnglishAuctionNFT.abi as unknown) as AbiItem,
                getEnglishAuctionNFT(chainId),
              );

              if (standard === NftType.ERC721) {
                await ContractBounceERC721WithSign.methods
                  .approve(getEnglishAuctionNFT(chainId), tokenId)
                  .send({ from: address });

                await new Promise((resolve, reject) => {
                  ContractBounceEnglishAuctionNFT.methods
                    .createErc721(
                      name,
                      tokenContract,
                      unitContract,
                      tokenId,
                      Web3.utils.toWei(purchasePrice.toString()),
                      Web3.utils.toWei(minBid.toString()),
                      Web3.utils.toWei(minIncremental.toString()),
                      Web3.utils.toWei(reservePrice.toString()),
                      duration,
                      onlyBOT,
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
                ContractBounceERC1155WithSign.methods
                  .setApprovalForAll(getEnglishAuctionNFT(chainId), true)
                  .send({ from: address });

                await new Promise((resolve, reject) => {
                  ContractBounceEnglishAuctionNFT.methods
                    .createErc1155(
                      name,
                      tokenContract,
                      unitContract,
                      tokenId,
                      quantity,
                      Web3.utils.toWei(purchasePrice.toString()),
                      Web3.utils.toWei(minBid.toString()),
                      Web3.utils.toWei(minIncremental.toString()),
                      Web3.utils.toWei(reservePrice.toString()),
                      duration,
                      onlyBOT,
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
            }
          })(),
        };
      },
      asMutation: true,
    },
  };
});
