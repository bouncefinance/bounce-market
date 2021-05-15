import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { IGetPools, IGetPoolsApi } from 'modules/common/api/getPools';
import { FANGIBLE_URL } from 'modules/common/conts';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store/store';
import { AuctionType } from '../api/auctionType';

// interface IFetchNFTItemsArgs {}

enum ChannelRequestParams {
  fineArts = 'FineArts',
  sports = 'Sports',
  comics = 'Conicbooks',
}

const getPools = createSmartAction<
  RequestAction<IGetPoolsApi, IGetPools>,
  [
    {
      user?: string;
      offset?: number;
      count?: number;
    }?,
  ]
>('MarketplaceActions/getPools', params => ({
  request: {
    url: '/pools',
    method: 'get',
    baseURL: FANGIBLE_URL,
    params: {
      user_address: params?.user,
      offset: params?.offset || 0,
      count: params?.count || 100,
    },
  },
  meta: {
    driver: 'axios',
    getData: response => {
      if (response.code !== 200) {
        throw new Error(response.msg);
      }

      return response.data;
    },
  },
}));

export const fetchNFTItems = createSmartAction<RequestAction>(
  'MarketplaceActions/fetchNFTItems',
  () => ({
    request: {
      url: '/api/v2/main/getitemsbyfilter',
      method: 'post',
    },
    meta: {
      auth: true,
      driver: 'axios',
      onRequest: async (
        request,
        _action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        const { data } = await store.dispatchRequest(getPools());

        if (data) {
          const tradePools = (data.tradePools || [])
            .map(item => ({
              ...item,
              poolType: AuctionType.FixedSwap,
            }))
            .filter(item => item.state !== 1);

          const tradeAuctions = (data.tradeAuctions || [])
            .map(item => ({
              ...item,
              price:
                item.lastestBidAmount !== '0'
                  ? item.lastestBidAmount
                  : item.amountMin1,
              poolType: AuctionType.EnglishAuction,
            }))
            .filter(item => item.state !== 1 && item.poolId !== 0);

          const pools = [...tradePools, ...tradeAuctions];
          const list = pools.map(item => item.tokenId);
          const ctsList = pools.map(item => item.token0);

          request.data = {
            ids: list,
            cts: ctsList,
            category: '',
            channel: ChannelRequestParams.fineArts,
          };
        }

        return request;
      },
    },
  }),
);
