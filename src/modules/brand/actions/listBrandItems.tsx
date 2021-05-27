import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { queryItemByFilter } from 'modules/pools/actions/queryItemByFilter';
import { queryPools } from 'modules/pools/actions/queryPools';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { compare } from '../api/queryBrand';
import { ListBrandItemsAction } from './const';
import { queryBrandItem1155, queryBrandItem721 } from './queryBrandItems';

export const listBrandItems = createSmartAction(
  ListBrandItemsAction,
  ({ userAddress, contractAddress }) => ({
    request: {
      promise: (async function () { })(),
    },
    meta: {
      asMutation: true,
      onRequest: (
        reqeust: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: (async () => {
            const { data: items721 } = await store.dispatchRequest(
              queryBrandItem721({
                user_address: userAddress,
                contract_address: contractAddress
              })
            )

            const { data: items1155 } = await store.dispatchRequest(
              queryBrandItem1155({
                user_address: userAddress,
                contract_address: contractAddress
              })
            )

            const { data: pools } = await store.dispatchRequest(
              queryPools(userAddress)
            )

            const tradePools = pools?.tradePools?.filter(item => item.state !== 1 && compare(item.token0, contractAddress))
              ?? [];
            const tradeAuctions = pools?.tradeAuctions?.filter(item => item.state !== 1 && compare(item.token0, contractAddress))
              ?? [];

            const list = items721.concat(items1155).concat(tradePools).concat(tradeAuctions);

            const ids = list.map((item: any) => item.tokenId || parseInt(item.token_id));
            const cts = list.map((item: any) => item.token0 || item.contract_addr)

            const { data: items } = await store.dispatchRequest(
              queryItemByFilter({
                ids: ids,
                cts: cts,
                category: '',
                channel: '',
              })
            )

            const poolList = list.map((item: any) => {
              const poolInfo = items?.find((pool: any) => {
                return (parseInt(item.token_id) === pool.id || item.tokenId === pool.id)
                  && (
                    compare(item.contract_addr, pool.contractaddress) ||
                    compare(item.contract_addr, pool.token0)
                  )
              })

              if (poolInfo) {
                return {
                  ...poolInfo,
                  poolType: item && item.amount_total0 ? 'fixedSwap' : 'englishAuction',
                  poolId: item && item.poolId,
                  price: item && (item.lastestBidAmount || item.amountMin1),
                  token1: item && item.token1,
                  createTime: item && item.createTime
                }
              } else {
                return null
              }
            })
            return poolList;
          })()
        }
      }
    }
  })
)