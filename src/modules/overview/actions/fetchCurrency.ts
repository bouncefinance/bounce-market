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
import { BounceERC20 } from '../../web3/contracts';
import { throwIfDataIsEmptyOrError } from '../../common/utils/throwIfDataIsEmptyOrError';
import { fromWei } from '../../common/utils/fromWei';
import { Address, Seconds } from '../../common/types/unit';

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
            const {
              data: { chainId, address, web3 },
            } = getQuery(store.getState(), {
              type: setAccount.toString(),
              action: setAccount,
            });

            if (unitContract === ZERO_ADDRESS) {
              const balanceOf = await web3.eth.getBalance(address);

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
                balanceOf: new BigNumber(fromWei(balanceOf, data.decimals)),
              } as IFetchCurrencyData;
            }

            const BounceERC20Contract = new web3.eth.Contract(
              BounceERC20,
              unitContract,
            );

            const decimals = await BounceERC20Contract.methods
              .decimals()
              .call();
            const symbol = await BounceERC20Contract.methods.symbol().call();
            const balanceOf = await BounceERC20Contract.methods
              .balanceOf(address)
              .call();

            const { data } = throwIfDataIsEmptyOrError(
              await store.dispatchRequest(fetchPriceBySymbol(symbol)),
            );

            return {
              priceUsd: data.priceUsd,
              decimals: decimals,
              balanceOf: new BigNumber(fromWei(balanceOf, decimals)),
            } as IFetchCurrencyData;
          })(),
        };
      },
      getData: data => data,
      ...meta,
    },
  }),
);
