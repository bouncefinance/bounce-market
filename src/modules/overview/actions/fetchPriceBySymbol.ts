import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { TokenSymbol } from '../../common/types/TokenSymbol';

const NATIVE_TOKEN_DECIMALS = 18;

interface IFetchPriceBySymbolParams {
  tokenSymbol: TokenSymbol;
}

interface IApiFetchPriceBySymbolDetails {
  data: [
    {
      coin_code: 'binance-coin' | 'auction' | 'bitcoin';
      exchange_code: 'binance';
      name: string; // 'Binance'
      name_zh: string;
      pair1: string;
      pair2: 'USDT';
      price: number;
      vol: number;
      volume: number;
      accounting: number;
      update_time: string; //'刚刚'
      logo: string;
      price_usd: number;
      symbol_pair: string;
      exchange_url: string;
      is_focus: number;
      type: number;
      exclude: number;
      ads: [];
      adpairs: [];
      exrank: number;
      url: string;
      tickerid: string;
      open_interest: number;
      open_interest_ratio: number;
      showkline: number;
      changerate: number;
    },
  ];
  maxpage: number;
  currpage: number;
  code: number | 200;
  msg: string | 'success';
}

interface IFetchPriceBySymbolDetails {
  priceUsd: BigNumber;
  decimals: number;
}

export const fetchPriceBySymbol = createSmartAction<
  RequestAction<IApiFetchPriceBySymbolDetails, IFetchPriceBySymbolDetails>
>(
  'fetchPriceBySymbol',
  (
    { tokenSymbol }: IFetchPriceBySymbolParams,
    meta?: RequestActionMeta<
      IApiFetchPriceBySymbolDetails,
      IFetchPriceBySymbolDetails
    >,
  ) => {
    if (
      tokenSymbol === TokenSymbol.USDT ||
      tokenSymbol === TokenSymbol.BUSD ||
      tokenSymbol === TokenSymbol.USDC
    ) {
      return {
        request: {
          promise: (async function () {
            return {
              priceUsd: new BigNumber(1),
              decimals: NATIVE_TOKEN_DECIMALS,
            } as IFetchPriceBySymbolDetails;
          })(),
        },
      };
    }

    const symbol = (() => {
      if (tokenSymbol === 'BNB') {
        return 'binance-coin';
      } else if (tokenSymbol === 'AUCTION') {
        return 'auction';
      } else if (tokenSymbol === 'BTC') {
        return 'bitcoin';
      } else if (tokenSymbol === 'ETH') {
        return 'ethereum';
      }

      return tokenSymbol;
    })();

    return {
      request: {
        url: 'https://dncapi.bqrank.net/api/v2/Coin/market_ticker',
        method: 'get',
        params: {
          page: 1,
          pagesize: 1,
          code: symbol,
        },
      },
      meta: {
        driver: 'axios',
        asMutation: false,
        getData: ({ data }) => {
          return {
            priceUsd: new BigNumber(data[0].price_usd),
            decimals: NATIVE_TOKEN_DECIMALS,
          };
        },
        ...meta,
      },
    };
  },
);
