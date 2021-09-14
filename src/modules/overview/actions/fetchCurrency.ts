import { createAction as createSmartAction } from 'redux-smart-actions';
import { BigNumber } from 'bignumber.js';
import { getNativeTokenSymbol, ZERO_ADDRESS } from '../../common/conts';
import {
  DispatchRequest,
  getQuery,
  RequestAction,
  RequestActionMeta,
} from '@redux-requests/core';
import { setAccount } from '../../account/store/actions/setAccount';
import { Store } from 'redux';
import { RootState } from '../../../store';
import { fetchPriceBySymbol } from './fetchPriceBySymbol';
import { throwIfDataIsEmptyOrError } from '../../common/utils/throwIfDataIsEmptyOrError';
import { Address, Seconds } from '../../common/types/unit';
import { getNotWeb3WalletInfo } from 'modules/account/hooks/useWeb3React';
import { getChainId } from 'modules/common/utils/localStorage';

const CACHE_LIFETIME: Seconds = 180;

interface IFetchCurrencyData {
  priceUsd: BigNumber;
  decimals: number;
  balanceOf: BigNumber;
}

interface IFetchCurrencyParams {
  unitContract: Address;
}

export const fetchCurrency = createSmartAction<
  RequestAction<IFetchCurrencyData, IFetchCurrencyData>
>(
  'fetchCurrency',
  (
    { unitContract }: IFetchCurrencyParams,
    meta?: RequestActionMeta<IFetchCurrencyData, IFetchCurrencyData>,
  ) => ({
    request: {
      promise: (async function () {})(),
    },
    meta: {
      cache: CACHE_LIFETIME,
      requestKey: unitContract,
      requestsCapacity: 10,
      onRequest: (
        request: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: (async function () {
            const { data: accountData } = getQuery(store.getState(), {
              type: setAccount.toString(),
              action: setAccount,
            });

            const chainId =
              (accountData ?? getNotWeb3WalletInfo())?.chainId ?? getChainId();

            if (unitContract === ZERO_ADDRESS) {
              const { data } = throwIfDataIsEmptyOrError(
                await store.dispatchRequest(
                  fetchPriceBySymbol({
                    tokenSymbol: getNativeTokenSymbol(chainId),
                  }),
                ),
              );
              return {
                priceUsd: data.priceUsd,
                decimals: data.decimals,
              } as IFetchCurrencyData;
            }

            const { data } = throwIfDataIsEmptyOrError(
              await store.dispatchRequest(
                fetchPriceBySymbol({
                  tokenSymbol: getNativeTokenSymbol(chainId),
                }),
              ),
            );

            return {
              priceUsd: data.priceUsd,
              // decimals: decimals,
              // balanceOf: new BigNumber(fromWei(balanceOf, decimals)),
            } as IFetchCurrencyData;
          })(),
        };
      },
      getData: data => data,
      ...meta,
    },
  }),
);
