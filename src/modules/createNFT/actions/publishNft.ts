import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { AuctionType } from 'modules/api/common/auctionType';
import { NftType } from 'modules/api/common/NftType';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { setAccount } from '../../account/store/actions/setAccount';
import { Seconds } from '../../common/types/unit';
import { throwIfDataIsEmptyOrError } from '../../common/utils/throwIfDataIsEmptyOrError';
import { toWei } from '../../common/utils/toWei';
import { fetchCurrency } from '../../overview/actions/fetchCurrency';
import {
  BounceEnglishAuctionNFT,
  BounceErc1155,
  BounceFixedSwapNFTTime,
  BounceEnglishAuctionNFTTime,
  BounceErc721,
  BounceFixedSwapNFT,
} from '../../web3/contracts';

export const getFixedSwapContract = (chainID: number, isTime = false) => {
  switch (chainID) {
    case 1:
      return process.env.REACT_APP_FIXED_CONTRACT_ADDRESS_ETH_MAINNET;
    case 4:
      return isTime
        ? process.env.REACT_APP_FIXED_CONTRACT_ADDRESS_RINKEBY_TIME
        : process.env.REACT_APP_FIXED_CONTRACT_ADDRESS_RINKEBY;
    case 56:
      return isTime
        ? process.env.REACT_APP_FIXED_CONTRACT_ADDRESS_TIME
        : process.env.REACT_APP_FIXED_CONTRACT_ADDRESS;
    case 128:
      return process.env.REACT_APP_FIXED_CONTRACT_ADDRESS_HECO;
    case 137:
      return process.env.REACT_APP_FIXED_CONTRACT_ADDRESS_MATIC;
    default:
      return '0x65B2FA838588003102fb3883e608f8b0049BFDD1';
  }
};

export const getEnglishAuctionContract = (chainID: number, isTime = false) => {
  switch (chainID) {
    case 1:
      return process.env.REACT_APP_ENGLISH_AUCTION_CONTRACT_ADDRESS_ETH_MAINNET;
    case 4:
      return isTime
        ? process.env.REACT_APP_ENGLISH_AUCTION_CONTRACT_ADDRESS_RINKEBY_TIME
        : process.env.REACT_APP_ENGLISH_AUCTION_CONTRACT_ADDRESS_RINKEBY;
    case 56:
      return isTime
        ? process.env.REACT_APP_ENGLISH_AUCTION_CONTRACT_ADDRESS_TIME
        : process.env.REACT_APP_ENGLISH_AUCTION_CONTRACT_ADDRESS;
    case 128:
      return process.env.REACT_APP_ENGLISH_AUCTION_CONTRACT_ADDRESS_HECO;
    case 137:
      return process.env.REACT_APP_ENGLISH_AUCTION_CONTRACT_ADDRESS_MATIC;
    default:
      return '0xFe8f5BaB50ff6a9d5C7eE4b598efDF792a6a5525';
  }
};

export interface ISaleTime {
  open: boolean;
  time: number;
}

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
      saleTime: ISaleTime;
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
      saleTime: ISaleTime;
    };

interface IApproveParams {
  nftContract_CT: any;
  nftId?: number;
  tarContract?: string;
  sender?: string;
}

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
            const isOpenSaleTime = payload?.saleTime?.open ?? false;

            const ContractBounceERC721 = new web3.eth.Contract(
              BounceErc721,
              payload.tokenContract,
            );
            const ContractBounceERC1155 = new web3.eth.Contract(
              BounceErc1155,
              payload.tokenContract,
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

            const equalAddress = (add1: string, add2: string) => {
              return String(add1).toLowerCase() === String(add2).toLowerCase();
            };

            const approveNFT_721 = async ({
              nftContract_CT,
              nftId,
              tarContract,
              sender,
            }: IApproveParams) => {
              const approveAddress = await nftContract_CT.methods
                .getApproved(nftId)
                .call();
              if (!tarContract || equalAddress(approveAddress, tarContract))
                return;

              await nftContract_CT.methods
                .approve(tarContract, nftId)
                .send({ from: sender });
            };

            const approveNFT_1155 = async ({
              nftContract_CT,
              tarContract,
              sender,
            }: IApproveParams) => {
              const approveRes: boolean = await nftContract_CT.methods
                .isApprovedForAll(sender, tarContract)
                .call();
              if (approveRes) return;

              await nftContract_CT.methods
                .setApprovalForAll(tarContract, true)
                .send({ from: sender });
            };

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

              const ContractBounceFixedSwapNFT = new web3.eth.Contract(
                isOpenSaleTime ? BounceFixedSwapNFTTime : BounceFixedSwapNFT,
                getFixedSwapContract(chainId, isOpenSaleTime),
              );
              if (standard === NftType.ERC721) {
                await approveNFT_721({
                  nftContract_CT: ContractBounceERC721,
                  nftId: tokenId,
                  tarContract: getFixedSwapContract(chainId, isOpenSaleTime),
                  sender: address,
                });

                await new Promise((resolve, reject) => {
                  ContractBounceFixedSwapNFT.methods
                    .createErc721(
                      ...(isOpenSaleTime
                        ? [
                            name,
                            tokenContract,
                            unitContract,
                            tokenId,
                            toWei(price.toFixed(), decimals),
                            payload.saleTime.time / 1000,
                            onlyBOT,
                          ]
                        : [
                            name,
                            tokenContract,
                            unitContract,
                            tokenId,
                            toWei(price.toFixed(), decimals),
                            onlyBOT,
                          ]),
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
                await approveNFT_1155({
                  nftContract_CT: ContractBounceERC1155,
                  nftId: tokenId,
                  tarContract: getFixedSwapContract(chainId, isOpenSaleTime),
                  sender: address,
                });

                await new Promise((resolve, reject) => {
                  ContractBounceFixedSwapNFT.methods
                    .createErc1155(
                      ...(isOpenSaleTime
                        ? [
                            name,
                            tokenContract,
                            unitContract,
                            tokenId,
                            quantity,
                            toWei(
                              price.multipliedBy(quantity).toFixed(),
                              decimals,
                            ),
                            payload.saleTime.time / 1000,
                            onlyBOT,
                          ]
                        : [
                            name,
                            tokenContract,
                            unitContract,
                            tokenId,
                            quantity,
                            toWei(
                              price.multipliedBy(quantity).toFixed(),
                              decimals,
                            ),
                            onlyBOT,
                          ]),
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
              // ---- English Auction ------
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
                isOpenSaleTime
                  ? BounceEnglishAuctionNFTTime
                  : BounceEnglishAuctionNFT,
                getEnglishAuctionContract(chainId, isOpenSaleTime),
              );

              if (standard === NftType.ERC721) {
                await approveNFT_721({
                  nftContract_CT: ContractBounceERC721,
                  nftId: tokenId,
                  tarContract: getEnglishAuctionContract(
                    chainId,
                    isOpenSaleTime,
                  ),
                  sender: address,
                });

                await new Promise((resolve, reject) => {
                  ContractBounceEnglishAuctionNFT.methods
                    .createErc721(
                      ...(isOpenSaleTime
                        ? [
                            name,
                            tokenContract,
                            unitContract,
                            tokenId,
                            toWei(purchasePrice, decimals),
                            toWei(minBid, decimals),
                            toWei(minIncremental.toFixed(), decimals),
                            toWei(reservePrice, decimals),
                            payload.saleTime.time / 1000,
                            duration,
                            onlyBOT,
                          ]
                        : [
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
                          ]),
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
                await approveNFT_1155({
                  nftContract_CT: ContractBounceERC1155,
                  nftId: tokenId,
                  tarContract: getEnglishAuctionContract(
                    chainId,
                    isOpenSaleTime,
                  ),
                  sender: address,
                });

                await new Promise((resolve, reject) => {
                  ContractBounceEnglishAuctionNFT.methods
                    .createErc1155(
                      ...(isOpenSaleTime
                        ? [
                            name,
                            tokenContract,
                            unitContract,
                            tokenId,
                            quantity,
                            toWei(purchasePrice, decimals),
                            toWei(minBid, decimals),
                            toWei(minIncremental.toFixed(), decimals),
                            toWei(reservePrice, decimals),
                            payload.saleTime.time / 1000,
                            duration,
                            onlyBOT,
                          ]
                        : [
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
                          ]),
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
