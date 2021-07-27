import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
import { AuctionState, PoolState } from 'modules/api/common/AuctionState';
import { AuctionType } from 'modules/api/common/auctionType';
import { FixedSwapState } from 'modules/api/common/FixedSwapState';
import { auctionTypeMap } from 'modules/api/common/poolType';
import {
  fetchItemsByFilter,
  IItemByFilter,
  ItemsChannel,
} from 'modules/overview/actions/fetchItemsByFilter';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import { RootState } from 'store';
import Web3 from 'web3';
import { getRecords } from './getRecords';

export interface IMyBid extends IItemByFilter {
  poolType: AuctionType;
  poolId: number;
  price: BigNumber;
  token1: string;
  createTime: number;
  openAt: Date;
  state: AuctionState | FixedSwapState;
}

export interface IQueryMyBids {
  list: IMyBid[];
}

interface IQueryMyBidsArgs {
  channel?: ItemsChannel;
}

export const queryMyBids = createAction<
  RequestAction<any, IQueryMyBids>,
  [IQueryMyBidsArgs?]
>('queryMyBids', params => ({
  request: {
    promise: (async function () {})(),
  },
  meta: {
    getData: data => data,
    onRequest: (
      request: { promise: Promise<any> },
      action: RequestAction,
      store: Store<RootState> & { dispatchRequest: DispatchRequest },
    ) => ({
      promise: (async () => {
        const response: IQueryMyBids = {
          list: [],
        };

        const {
          data: { address },
        } = getQuery<ISetAccountData>(store.getState(), {
          type: setAccount.toString(),
        });

        const { data: records } = await store.dispatchRequest(
          getRecords({ count: 1000, address }),
        );

        if (!records) {
          return response;
        }

        const tradeAuctions = records.tradeAuctions.map(item => ({
          ...item,
          price:
            item.lastestBidAmount !== '0'
              ? item.lastestBidAmount
              : item.amountMin1,
          poolType: auctionTypeMap[item.auctiontype.toString()],
        }));

        const { data: itemsByFilter } = await store.dispatchRequest(
          fetchItemsByFilter({
            ids: tradeAuctions.map(item => item.tokenId),
            cts: tradeAuctions.map(item => item.token0),
            channel: params?.channel || ItemsChannel.all,
          }),
        );

        if (!itemsByFilter || !itemsByFilter?.length) {
          return response;
        }

        const isEnglishAuction = (type: AuctionType) =>
          type === AuctionType.EnglishAuction ||
          type === AuctionType.EnglishAuction_Timing;
        const getEnglishState = (state: PoolState) =>
          state === PoolState.Live ? AuctionState.Live : AuctionState.Claimed;
        const getFixedState = (state: PoolState) =>
          state === PoolState.Live
            ? FixedSwapState.Live
            : FixedSwapState.Claimed;
        const list = tradeAuctions
          .map(pool => {
            const item = itemsByFilter.find(r => r.id === pool.tokenId);

            return {
              ...item,
              poolType: pool.poolType,
              poolId: pool.poolId,
              price: new BigNumber(Web3.utils.fromWei(pool.price)),
              token1: pool.token1,
              createTime: pool.createTime,
              openAt: new Date((pool as any).openAt * 1000),
              state: isEnglishAuction(pool.poolType)
                ? getEnglishState(pool.state)
                : getFixedState(pool.state),
            } as IMyBid;
          })
          .filter(item => item.fileurl)
          .sort((a, b) => b.createTime - a.createTime);

        response.list = list;

        return response;
      })(),
    }),
  },
}));
