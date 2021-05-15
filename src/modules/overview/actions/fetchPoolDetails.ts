import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { NftType } from '../../createNFT/actions/createNft';
import BigNumber from 'bignumber.js';
import { Address } from '../../common/types/unit';
import Web3 from 'web3';
import { AuctionType } from '../api/auctionType';
import { AuctionState } from '../../common/const/AuctionState';

interface IApiFixedAuctionDetails {
  amount_total0: number;
  amount_total1: string;
  createTime: number;
  creator: Address;
  name: string;
  nftType: 0;
  poolId: number;
  price: string;
  state: AuctionState;
  token0: string;
  token1: string;
  tokenId: number;
}

interface IApiEnglishAuctionDetails {
  amountMax1: string;
  amountMin1: string;
  amountMinIncr1: string;
  bidderClaimed: boolean;
  closeAt: number;
  createTime: number;
  creator: Address;
  creatorClaimed: boolean;
  duration: number;
  lastestBidAmount: string;
  name: string;
  nftType: 1;
  poolId: number;
  state: AuctionState;
  token0: string;
  token1: string;
  tokenAmount0: number;
  tokenId: number;
}

interface IApiFetchPoolDetails {
  code: 200;
  data: IApiFixedAuctionDetails | IApiEnglishAuctionDetails;
  msg: 'ok';
}

interface IFixedAuctionDetails {
  quantity: number;
  totalPrice: BigNumber;
  createTime: Date;
  creator: Address;
  name: string;
  nftType: NftType;
  poolId: number;
  price: BigNumber;
  state: AuctionState;
  tokenContract: Address;
  unitContract: Address;
  tokenId: number;
}

interface IEnglishAuctionDetails {
  amountMax1: BigNumber;
  amountMin1: BigNumber;
  amountMinIncr1: BigNumber;
  bidderClaimed: boolean;
  closeAt: Date;
  createTime: Date;
  creator: Address;
  creatorClaimed: boolean;
  duration: number;
  lastestBidAmount: BigNumber;
  name: string;
  nftType: NftType;
  poolId: number;
  state: AuctionState;
  tokenContract: Address;
  unitContract: Address;
  tokenAmount0: number;
  tokenId: number;
}

export type IFetchPoolDetailsData =
  | IFixedAuctionDetails
  | IEnglishAuctionDetails;

function isApiEnglishAuction(
  data: IApiFixedAuctionDetails | IApiEnglishAuctionDetails,
): data is IApiEnglishAuctionDetails {
  return (data as IApiEnglishAuctionDetails).amountMax1 !== undefined;
}

export function isEnglishAuction(
  data: IFetchPoolDetailsData,
): data is IEnglishAuctionDetails {
  return (data as IEnglishAuctionDetails).amountMax1 !== undefined;
}

interface IFetchPoolDetailsParams {
  poolId: number;
  poolType: AuctionType;
}

// TODO Replace Web3.utils.fromWei by fromWei

export const fetchPoolDetails = createSmartAction<
  RequestAction<IApiFetchPoolDetails, IFetchPoolDetailsData>
>(
  'fetchPoolDetails',
  (
    params: IFetchPoolDetailsParams,
    meta?: RequestActionMeta<IApiFetchPoolDetails, IFetchPoolDetailsData>,
  ) => ({
    request: {
      url: 'https://api1-bsc.fangible.com/v1/bsc_test/pool',
      method: 'get',
      params: {
        pool_id: params.poolId,
        pool_type:
          params.poolType === AuctionType.FixedSwap ? 'fixedswap' : 'english',
      },
    },
    meta: {
      auth: true,
      driver: 'axios',
      asMutation: false,
      getData: ({ data }) => {
        if (isApiEnglishAuction(data)) {
          return {
            amountMax1: new BigNumber(Web3.utils.fromWei(data.amountMax1)),
            amountMin1: new BigNumber(Web3.utils.fromWei(data.amountMin1)),
            amountMinIncr1: new BigNumber(
              Web3.utils.fromWei(data.amountMinIncr1),
            ),
            bidderClaimed: data.bidderClaimed,
            closeAt: new Date(data.closeAt * 1000),
            createTime: new Date(data.createTime * 1000),
            creator: data.creator,
            creatorClaimed: data.creatorClaimed,
            duration: data.duration,
            lastestBidAmount: new BigNumber(
              Web3.utils.fromWei(data.lastestBidAmount),
            ),
            name: data.name,
            /**
             * For fields returned by the https://api1-bsc.fangible.com interface and data read directly from the contract, nftType=0 represents ERC721 and 1 represents ERC1155.
             * If the interface from https://bounce-market.bounce.finance/api/ requested data standard = 1 represents ERC721, 2 representative ERC1155
             */
            nftType: NftType.ERC1155,
            poolId: data.poolId,
            state: data.state,
            tokenContract: data.token0,
            unitContract: data.token0,
            tokenAmount0: data.tokenAmount0,
            tokenId: data.tokenId,
          };
        } else {
          return {
            quantity: data.amount_total0,
            totalPrice: new BigNumber(Web3.utils.fromWei(data.amount_total1)),
            createTime: new Date(data.createTime * 1000),
            creator: data.creator,
            name: data.name,
            nftType: NftType.ERC721,
            poolId: data.poolId,
            price: new BigNumber(Web3.utils.fromWei(data.price)),
            state: data.state,
            tokenContract: data.token0,
            unitContract: data.token1,
            tokenId: data.tokenId,
          };
        }
      },
      ...meta,
    },
  }),
);
