import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { TokenSymbol } from '../../common/types/TokenSymbol';

const NATIVE_TOKEN_DECIMALS = 18;

interface IFetchPriceBySymbolParams {
  tokenSymbol: TokenSymbol;
}

interface IApiFetchPriceBySymbolDetails {
  data: {
    basecoin: string;
    prices: {
      [key in string]: number;
    };
    code: number | 200;
    msg: string | 'success';
  };
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
      if (tokenSymbol === TokenSymbol.BNB) {
        return 'BNB';
      }
      if (tokenSymbol === TokenSymbol.AUCTION) {
        return 'auction';
      }
      // if (tokenSymbol === TokenSymbol.BTC) {
      //   return 'bitcoin';
      // }
      if (tokenSymbol === TokenSymbol.ETH) {
        return 'ETH';
      }
      if (tokenSymbol === TokenSymbol.MATIC) {
        return 'MATIC';
      }
      if (tokenSymbol === TokenSymbol.HT) {
        return 'HT';
      }

      return tokenSymbol;
    })();

    return {
      request: {
        url: '/get_symbols_price',
        method: 'post',
        data: {
          codes: [symbol],
        },
      },
      meta: {
        driver: 'axios',
        asMutation: false,
        getData: ({ data }) => {
          return {
            priceUsd: new BigNumber(data.prices[symbol]),
            decimals: NATIVE_TOKEN_DECIMALS,
          };
        },
        ...meta,
      },
    };
  },
);
