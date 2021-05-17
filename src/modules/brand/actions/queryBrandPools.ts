
import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { setAccount } from 'modules/account/store/actions/setAccount';
import { queryItemByFilter } from 'modules/pools/actions/queryItemByFilter';
import { queryPools } from 'modules/pools/actions/queryPools';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { compare } from '../api/queryBrand';
import { QueryBrandPoolsAction } from './const';

export interface IQueryBrandItem {
  owneraddress: string;
  contractaddress: string;
}

export const queryBrandPools = createSmartAction(
  QueryBrandPoolsAction,
  (data: IQueryBrandItem) => ({
    request: {
      promise: (async function () { })(),
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
              queryPools(data.owneraddress)
            )

            const fsPools = (poolData?.tradePools ?? [])
              .filter(item => item.state !== 1 && compare(item.token0, data.contractaddress));
            const eaPools = (poolData?.tradeAuctions ?? [])
              .filter(item => item.state !== 1 && compare(item.token0, data.contractaddress));

            const fsToken = fsPools
              .map(item => item.tokenId);
            const eaToken = eaPools
              .map(item => item.tokenId);
            const tokenList = fsToken.concat(eaToken);

            if (tokenList.length > 0) {
              const { data: { address} } = getQuery(store.getState(), {
                type: setAccount.toString(),
                action: setAccount,
              });

              const { data: itemData } = await store.dispatchRequest(
                queryItemByFilter({
                  accountaddress: address,
                  category: "",
                  channel: "",
                  cts: new Array(tokenList.length).fill(data.contractaddress),
                  ids: tokenList
                })
              )
              return new Promise((resolve, reject) => resolve(itemData));
            } else {
              return new Promise((resolve, reject) => resolve([]));
            }
          })()
        }
      }
    }
  })
)