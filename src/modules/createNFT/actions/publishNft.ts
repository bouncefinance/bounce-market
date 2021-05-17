import { createAction as createSmartAction } from 'redux-smart-actions';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { AuctionType } from '../../overview/api/auctionType';
import { Store } from 'redux';
import { RootState } from 'store';
import { setAccount } from '../../account/store/actions/setAccount';
import { getBounceERC1155WithSign, getBounceERC721WithSign } from '../api/sign';
import { NftType } from './createNft';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { Seconds } from '../../common/types/unit';
import {
  BounceEnglishAuctionNFT,
  BounceERC1155WithSign,
  BounceERC721WithSign,
  BounceFixedSwapNFT,
} from '../../web3/contracts';
import { fetchCurrency } from '../../overview/actions/fetchCurrency';
import { throwIfDataIsEmptyOrError } from '../../common/utils/throwIfDataIsEmptyOrError';
import { toWei } from '../../common/utils/toWei';

export const getFixedSwapContract = (chainID: number) => {
  switch (chainID) {
    case 1:
      return '';
    case 4:
      return '0x65B2FA838588003102fb3883e608f8b0049BFDD1';
    case 56:
      return '0x1C035FD1F11eA9Bb753625fD167205Cd40029607';
    // return '0x58E84d90fd976A183bEfB36a69caB464bef18cC5';
    default:
      return '0x65B2FA838588003102fb3883e608f8b0049BFDD1';
  }
};

export const getEnglishAuctionContract = (chainID: number) => {
  switch (chainID) {
    case 1:
      return '';
    case 4:
      return '0xFe8f5BaB50ff6a9d5C7eE4b598efDF792a6a5525';
    case 56:
      return '0x7eF2DECf116f8aeBb9a7940A4713C00997DF79fd';
    // return '0x780451a32959A96789F99398dEb6678d2c438EB4';
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
      purchasePrice: string;
      minBid: string;
      minIncremental: BigNumber;
      reservePrice: string;
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
              BounceFixedSwapNFT,
              getFixedSwapContract(chainId),
            );
            const ContractBounceERC721WithSign = new web3.eth.Contract(
              BounceERC721WithSign,
              getBounceERC721WithSign(chainId),
            );
            const ContractBounceERC1155WithSign = new web3.eth.Contract(
              BounceERC1155WithSign,
              getBounceERC1155WithSign(chainId),
            );
            const onlyBOT = false;

            const {
              data: { decimals },
            } = throwIfDataIsEmptyOrError(
              await store.dispatchRequest(
                fetchCurrency({ unitContract: payload.unitContract }),
              ),
            );

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
                      toWei(price.toFixed(), decimals),
                      onlyBOT,
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
                      toWei(price.multipliedBy(quantity).toFixed(), decimals),
                      onlyBOT,
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
                BounceEnglishAuctionNFT,
                getEnglishAuctionContract(chainId),
              );

              if (standard === NftType.ERC721) {
                await ContractBounceERC721WithSign.methods
                  .approve(getEnglishAuctionContract(chainId), tokenId)
                  .send({ from: address });

                await new Promise((resolve, reject) => {
                  ContractBounceEnglishAuctionNFT.methods
                    .createErc721(
                      name,
                      tokenContract,
                      unitContract,
                      tokenId,
                      toWei(purchasePrice, decimals),
                      toWei(minBid, decimals),
                      toWei(minIncremental.toFixed(), decimals),
                      toWei(reservePrice, decimals),
                      duration,
                      onlyBOT,
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
                ContractBounceERC1155WithSign.methods
                  .setApprovalForAll(getEnglishAuctionContract(chainId), true)
                  .send({ from: address });

                await new Promise((resolve, reject) => {
                  ContractBounceEnglishAuctionNFT.methods
                    .createErc1155(
                      name,
                      tokenContract,
                      unitContract,
                      tokenId,
                      quantity,
                      toWei(purchasePrice, decimals),
                      toWei(minBid, decimals),
                      toWei(minIncremental.toFixed(), decimals),
                      toWei(reservePrice, decimals),
                      duration,
                      onlyBOT,
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
            }
          })(),
        };
      },
      asMutation: true,
    },
  };
});
