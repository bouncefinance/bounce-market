import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { queryItemByFilter } from 'modules/pools/actions/queryItemByFilter';
import { queryPools } from 'modules/pools/actions/queryPools';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { compare } from '../api/queryBrand';
import { QueryBrandPoolsAction } from './const';

export interface IQueryBrandPoolsArgs {
  owneraddress: string;
  contractaddress: string;
}

export const queryBrandPools = createSmartAction<RequestAction>(
  QueryBrandPoolsAction,
  (params: IQueryBrandPoolsArgs) => ({
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
            const { data: poolData } = await store.dispatchRequest(
              queryPools(params.owneraddress),
            );

            const fsPools = (poolData?.tradePools ?? []).filter(
              item =>
                item.state !== 1 &&
                compare(item.token0, params.contractaddress),
            );
            const eaPools = (poolData?.tradeAuctions ?? []).filter(
              item =>
                item.state !== 1 &&
                compare(item.token0, params.contractaddress),
            );

            const fsToken = fsPools.map(item => Number(item.tokenId));
            const eaToken = eaPools.map(item => Number(item.tokenId));
            const tokenList = fsToken.concat(eaToken);

            if (tokenList.length > 0) {
              const { data: itemData } = await store.dispatchRequest(
                queryItemByFilter({
                  accountaddress: '',
                  category: '',
                  channel: '',
                  cts: new Array(tokenList.length).fill(params.contractaddress),
                  ids: tokenList,
                }),
              );
              return new Promise((resolve, reject) => resolve(itemData));
            } else {
              return new Promise((resolve, reject) => resolve([]));
            }
          })(),
        };
      },
    },
  }),
);
