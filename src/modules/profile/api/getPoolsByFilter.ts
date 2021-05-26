import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { POOLS_URL } from '../../common/conts';
import { NftType } from '../../createNFT/actions/createNft';
import {
  IApiFetchPoolDetails,
  IFetchPoolDetailsData,
  isApiEnglishAuction,
} from '../../overview/actions/fetchPoolDetails';

interface IApiPoolsData {
  code: 200;
  data: {
    englishTotal: 0;
    fixedSwapTotal: 0;
    tradeAuctions?: IApiFetchPoolDetails['data'][];
    tradePools?: IApiFetchPoolDetails['data'][];
  };
  msg: 'ok';
}

function mapPool(data: IApiFetchPoolDetails['data']): IFetchPoolDetailsData {
  if (!data) {
    return null;
  } else if (isApiEnglishAuction(data)) {
    return {
      amountMax1: new BigNumber(Web3.utils.fromWei(data.amountMax1)),
      amountMin1: new BigNumber(Web3.utils.fromWei(data.amountMin1)),
      amountMinIncr1: new BigNumber(Web3.utils.fromWei(data.amountMinIncr1)),
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
}

interface IPoolsData {
  list: IFetchPoolDetailsData[];
}

export const getPoolsByFilter = createAction<
  RequestAction<IApiPoolsData, IPoolsData>,
  [
    {
      user?: string;
    }?,
    RequestActionMeta<IApiPoolsData, IPoolsData>?,
  ]
>('getPoolsByFilter', (params, meta) => ({
  request: {
    url: POOLS_URL,
    method: 'get',
    params: { user_address: params?.user, offset: 0, count: 1000 },
  },
  meta: {
    driver: 'axios',
    getData: response => {
      // TODO parse the response
      if (response.code !== 200) {
        throw new Error(response.msg);
      }

      return {
        list: [
          ...(response.data.tradePools?.map(mapPool) ?? []),
          ...(response.data.tradeAuctions?.map(mapPool) ?? []),
        ],
      };
    },
    ...meta,
  },
}));
