import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { ZERO_ADDRESS } from 'modules/common/conts';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store/store';
import { AuctionType } from '../api/auctionType';
import { IItemByFilter, ItemsChannel } from './fetchItemsByFilter';
import { fetchPools } from './fetchPools';

export interface INFTItem {
  category?: IItemByFilter['category'];
  channel?: string;
  contractaddress?: string;
  createTime: number;
  created_at?: string;
  description?: string;
  externallink?: string;
  fileurl?: string;
  id?: number;
  itemname?: string;
  itemsymbol?: string;
  likecount?: number;
  litimgurl?: string;
  metadata?: string;
  owneraddress?: string;
  poolId?: number;
  poolType: AuctionType;
  price: string;
  standard?: number;
  supply?: number;
  token1: string;
}

interface IFetchNFTItemsArgs {
  channel?: ItemsChannel;
  count?: number;
  offset?: number;
  address?: string;
}

export const fetchNFTItems = createSmartAction<
  RequestAction<any, INFTItem[]>,
  [IFetchNFTItemsArgs?]
>('NFTMarket/fetchNFTItems', params => ({
  request: {
    promise: (async function () {})(),
  },
  meta: {
    onRequest: (
      _request: { promise: Promise<any> },
      _action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async () => {
          const { data: poolsData } = await store.dispatchRequest(
            fetchPools(
              {
                category: '',
                channel: params?.channel || 'FineArts',
                currency: ZERO_ADDRESS,
                limit: 1000,
                offset: 0,
                orderfield: 1,
              },
              {
                asMutation: true,
              },
            ),
          );

          if (!poolsData) {
            return [];
          }

          const tradePools = poolsData
            ?.filter(item => item.state !== 1)
            ?.map(item => {
              return {
                category: item.category,
                channel: item.channel,
                contractaddress: item.token0,
                createTime: new Date(item.created_at).getTime(),
                created_at: item.created_at,
                description: 'description',
                externallink: 'externallink',
                fileurl: item.fileurl,
                id: item.tokenid,
                itemname: item.itemname,
                itemsymbol: 'itemsymbol',
                likecount: item.likecount,
                litimgurl: item.creatorurl,
                metadata: 'metadata',
                owneraddress: item.creator,
                poolId: item.poolid,
                poolType:
                  item.pooltype === 1
                    ? AuctionType.FixedSwap
                    : AuctionType.EnglishAuction,
                price: item.price,
                standard: 0,
                supply: 100,
                token1: item.token1,
              };
            });

          return tradePools;
        })(),
      };
    },
  },
}));
